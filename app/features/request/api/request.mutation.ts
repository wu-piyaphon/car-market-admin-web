import { useMutation } from "@tanstack/react-query";
import { REQUEST_API } from "./request.api";
import { REQUEST_KEYS } from "./request.keys";
import { queryClient } from "~/lib/query-client";
import type { RequestSellingUpdate } from "../types/request-selling.types";
import type { RequestEstimateUpdate } from "../types/request-estimate.types";

export const useUpdateRequestSellingMutation = () =>
  useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RequestSellingUpdate;
    }) => REQUEST_API.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.list });
    },
  });

export const useUpdateRequestEstimateMutation = () =>
  useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RequestEstimateUpdate;
    }) => REQUEST_API.estimate.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_KEYS.estimate.list });
    },
  });
