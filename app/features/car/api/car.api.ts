import { api } from "~/lib/api/axios";
import { endpoints } from "~/lib/api/endpoints";
import type {
  Car,
  CarListSearchQuery,
  CarPagination,
} from "../types/car.types";

export const CAR_API = {
  list: async (query: CarListSearchQuery): Promise<CarPagination> => {
    return await api.get<CarPagination>(endpoints.car.list, { params: query });
  },

  detail: (id: string): Promise<Car> => {
    return api.get<Car>(endpoints.car.detail(id));
  },
};
