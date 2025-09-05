import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "./token-manager";
import type { TQueue, ApiErrorResponse } from "./types/axios.types";
import { ApiError } from "./types/axios.types";
import { endpoints } from "./endpoints";

// ----------------------------------------------------------------------

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ----------------------------------------------------------------------
// Error handling utility

const handleApiError = (error: unknown): never => {
  // If error has response data (axios error)
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as { response?: { data: ApiErrorResponse } };
    if (axiosError.response?.data) {
      throw new ApiError(axiosError.response.data);
    }
  }

  // If it's already an ApiError, re-throw it
  if (error instanceof ApiError) {
    throw error;
  }

  // For network errors or other issues
  if (error instanceof Error && error.message) {
    throw new Error(error.message);
  }

  // Fallback error
  throw new Error("An unexpected error occurred");
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------------------------------------------------
// Token refresh state, retried requests, and queue management

let isRefreshing = false;
let failedQueue: Array<TQueue> = [];

const retriedRequests = new WeakSet();

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

// ----------------------------------------------------------------------
// Request interceptor - add auth token

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ----------------------------------------------------------------------
// Response interceptor - handle token refresh

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !retriedRequests.has(originalRequest)
    ) {
      if (isRefreshing) {
        // Queue request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      // Mark this request as retried to prevent infinite loops
      retriedRequests.add(originalRequest);
      isRefreshing = true;

      const refreshToken = tokenManager.getRefreshToken();

      if (!refreshToken) {
        tokenManager.clearTokens();
        processQueue(error);
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${API_BASE_URL}${endpoints.auth.refresh}`,
          {
            refreshToken,
          }
        );

        const { access_token: newAccessToken, refresh_token: newRefreshToken } =
          response.data;

        tokenManager.setTokens(newAccessToken, newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        tokenManager.clearTokens();
        processQueue(refreshError);
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------
// Simple API wrapper that returns data directly

export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .get<T>(url, config)
      .then(res => res.data)
      .catch(handleApiError),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    axiosInstance
      .post<T>(url, data, config)
      .then(res => res.data)
      .catch(handleApiError),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    axiosInstance
      .put<T>(url, data, config)
      .then(res => res.data)
      .catch(handleApiError),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance
      .delete<T>(url, config)
      .then(res => res.data)
      .catch(handleApiError),
};

export default axiosInstance;
