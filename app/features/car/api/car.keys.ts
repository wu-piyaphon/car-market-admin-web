import type { CarListSearchQuery } from "../types/car.types";

const KEY = "car";

export const CAR_KEYS = {
  list: (query: CarListSearchQuery) => [KEY, query] as const,
  detail: (id: string) => [KEY, id] as const,
} as const;
