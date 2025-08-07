export const AUTH_KEYS = {
  all: ["auth"] as const,
  profile: () => [...AUTH_KEYS.all, "profile"] as const,
} as const;
