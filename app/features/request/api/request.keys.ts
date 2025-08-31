import type { RequestSellingListQuery } from "../types/request-selling.types";
import type { RequestEstimateListQuery } from "../types/request-estimate.types";

const KEY = "request";

export const REQUEST_KEYS = {
  list: [KEY, "list"] as const,
  query: (query: RequestSellingListQuery) =>
    [...REQUEST_KEYS.list, query] as const,

  estimate: {
    list: [KEY, "estimate", "list"] as const,
    query: (query: RequestEstimateListQuery) =>
      [...REQUEST_KEYS.estimate.list, query] as const,
    detail: (id: string) => [...REQUEST_KEYS.estimate.list, id] as const,
  },
} as const;
