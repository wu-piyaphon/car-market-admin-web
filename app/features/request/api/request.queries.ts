import { useQuery } from "@tanstack/react-query";
import type { RequestSellingListQuery } from "../types/request-selling.types";
import { REQUEST_API } from "./request.api";
import { REQUEST_KEYS } from "./request.keys";

export const useGetRequestsSelling = (query: RequestSellingListQuery) =>
  useQuery({
    queryKey: REQUEST_KEYS.list(query),
    queryFn: () => REQUEST_API.list(query),
  });
