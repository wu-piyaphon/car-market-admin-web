import { useQuery } from "@tanstack/react-query";
import type { RequestSellingListQuery } from "../types/request-selling.types";
import type { RequestEstimateListQuery } from "../types/request-estimate.types";
import { REQUEST_API } from "./request.api";
import { REQUEST_KEYS } from "./request.keys";

export const useGetRequestsSelling = (query: RequestSellingListQuery) =>
  useQuery({
    queryKey: REQUEST_KEYS.query(query),
    queryFn: () => REQUEST_API.list(query),
  });

export const useGetRequestsEstimate = (query: RequestEstimateListQuery) =>
  useQuery({
    queryKey: REQUEST_KEYS.estimate.query(query),
    queryFn: () => REQUEST_API.estimate.list(query),
  });

export const useGetRequestEstimateDetail = (id: string) =>
  useQuery({
    queryKey: REQUEST_KEYS.estimate.detail(id),
    queryFn: () => REQUEST_API.estimate.detail(id),
  });
