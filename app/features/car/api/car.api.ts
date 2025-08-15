import { api } from "~/lib/api/axios";
import { endpoints } from "~/lib/api/endpoints";
import type { Car, CarPagination } from "../types/car.types";

export const CAR_API = {
  list: async (): Promise<CarPagination> => {
    return await api.get<CarPagination>(endpoints.car.list);
  },

  detail: (id: string): Promise<Car> => {
    return api.get<Car>(endpoints.car.detail(id));
  },
};
