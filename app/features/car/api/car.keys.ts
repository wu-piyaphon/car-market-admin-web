const KEY = "car";

export const CAR_KEYS = {
  all: KEY,
  list: () => [KEY, "list"] as const,
  detail: (id: string | undefined) => [KEY, id] as const,
  types: () => [KEY, "types"] as const,
  brands: () => [KEY, "brands"] as const,
  categories: () => [KEY, "categories"] as const,
} as const;
