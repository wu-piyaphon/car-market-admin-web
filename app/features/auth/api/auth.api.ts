import { api } from "~/lib/api/axios";
import { ENDPOINTS } from "~/lib/api/endpoints";
import type {
  AuthCredentials,
  AuthLoginResponse,
  RefreshTokenResponse,
} from "../types/auth.types";

export const AUTH_API = {
  login: (credentials: AuthCredentials): Promise<AuthLoginResponse> => {
    return api.post<AuthLoginResponse>(ENDPOINTS.auth.login, credentials);
  },

  refresh: (refreshToken: string): Promise<RefreshTokenResponse> => {
    return api.post<RefreshTokenResponse>(ENDPOINTS.auth.refresh, {
      refreshToken,
    });
  },
};
