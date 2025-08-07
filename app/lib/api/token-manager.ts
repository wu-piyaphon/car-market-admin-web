import { TOKEN_KEY } from "./token.keys";

export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY.access);
    }
    return null;
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY.refresh);
    }
    return null;
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY.access, accessToken);
      localStorage.setItem(TOKEN_KEY.refresh, refreshToken);
    }
  },

  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY.access);
      localStorage.removeItem(TOKEN_KEY.refresh);
    }
  },
};
