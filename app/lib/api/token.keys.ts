import type { TTokenKey, TTokenType } from "./types/token.types";

export const TOKEN_KEY: Record<TTokenKey, TTokenType> = {
  access: "access_token",
  refresh: "refresh_token",
} as const;
