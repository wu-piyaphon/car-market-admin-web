import type { RequestSellingListQuery } from "../types/request-selling.types";

const KEY = "request";

export const REQUEST_KEYS = {
  list: [KEY, "list"] as const,
  query: (query: RequestSellingListQuery) =>
    [...REQUEST_KEYS.list, query] as const,
} as const;
