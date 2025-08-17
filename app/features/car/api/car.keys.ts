import type { CarListSearchQuery } from "../types/car.types";

const KEY = "car";

export const CAR_KEYS = {
  list: [KEY, "list"] as const,
  query: (query: CarListSearchQuery) => [...CAR_KEYS.list, query] as const,
  detail: (id: string | undefined) => [KEY, id] as const,
  types: [KEY, "types"] as const,
  brands: [KEY, "brands"] as const,
  categories: [KEY, "categories"] as const,
} as const;
