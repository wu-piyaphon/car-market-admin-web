import { api } from "~/lib/api/axios";
import { endpoints } from "~/lib/api/endpoints";
import type {
  AuthCredentials,
  AuthLoginResponse,
  AuthUser,
  RefreshTokenResponse,
} from "../types/auth.types";

export const authApi = {
  login: (credentials: AuthCredentials): Promise<AuthLoginResponse> => {
    return api.post<AuthLoginResponse>(endpoints.auth.login, credentials);
  },

  getMe: (): Promise<AuthUser> => {
    return api.get<AuthUser>(endpoints.auth.me);
  },

  refresh: (refreshToken: string): Promise<RefreshTokenResponse> => {
    return api.post<RefreshTokenResponse>(endpoints.auth.refresh, {
      refreshToken,
    });
  },
};
