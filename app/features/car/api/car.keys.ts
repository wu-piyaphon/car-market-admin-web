export const CAR_KEYS = {
  list: ["car"] as const,
  detail: (id: string) => [...CAR_KEYS.list, id] as const,
} as const;
