import type { RequestSellingListQuery } from "../types/request-selling.types";

const KEY = "request";

export const REQUEST_KEYS = {
  list: (query: RequestSellingListQuery) => [KEY, "list", query] as const,
  detail: (id: string) => [KEY, "list", "detail", id] as const,
} as const;
