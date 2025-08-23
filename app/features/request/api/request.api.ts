import { api } from "~/lib/api/axios";
import { endpoints } from "~/lib/api/endpoints";

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
};
