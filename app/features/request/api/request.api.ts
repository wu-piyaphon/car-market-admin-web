import { api } from "~/lib/api/axios";
import { endpoints } from "~/lib/api/endpoints";

import type {
  RequestEstimateDetail,
  RequestEstimateList,
  RequestEstimateListQuery,
  RequestEstimateUpdate,
} from "../types/request-estimate.types";
import type {
  RequestSellingList,
  RequestSellingListQuery,
  RequestSellingUpdate,
} from "../types/request-selling.types";

export const REQUEST_API = {
  list: async (query: RequestSellingListQuery): Promise<RequestSellingList> => {
    return await api.get<RequestSellingList>(endpoints.sellingRequest.list, {
      params: query,
    });
  },
  update: async (id: string, data: RequestSellingUpdate): Promise<void> => {
    return await api.put(endpoints.sellingRequest.update(id), data);
  },
  estimate: {
    list: async (
      query: RequestEstimateListQuery
    ): Promise<RequestEstimateList> => {
      return await api.get<RequestEstimateList>(
        endpoints.estimateRequest.list,
        {
          params: query,
        }
      );
    },
    detail: async (id: string): Promise<RequestEstimateDetail> => {
      return await api.get<RequestEstimateDetail>(
        endpoints.estimateRequest.detail(id)
      );
    },
    update: async (id: string, data: RequestEstimateUpdate): Promise<void> => {
      return await api.put(endpoints.estimateRequest.update(id), data);
    },
  },
};
