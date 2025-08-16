import { api } from "~/lib/api/axios";
import { endpoints } from "~/lib/api/endpoints";
import type { Option, OptionWithImage } from "~/types/common";
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

  create: (data: FormData): Promise<Car> => {
    return api.post<Car>(endpoints.car.create, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  brands: (): Promise<OptionWithImage[]> => {
    return api.get<OptionWithImage[]>(endpoints.car.brands);
  },

  categories: (): Promise<Option[]> => {
    return api.get<Option[]>(endpoints.car.categories);
  },

  types: (): Promise<Option[]> => {
    return api.get<Option[]>(endpoints.car.types);
  },
};
