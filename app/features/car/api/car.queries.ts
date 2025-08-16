import { useQuery } from "@tanstack/react-query";
import type { CarListSearchQuery } from "../types/car.types";
import { CAR_API } from "./car.api";
import { CAR_KEYS } from "./car.keys";

export const useGetCars = (query: CarListSearchQuery) =>
  useQuery({
    queryKey: CAR_KEYS.list(query),
    queryFn: () => CAR_API.list(query),
  });

export const useGetCarDetail = (id: string) =>
  useQuery({
    queryKey: CAR_KEYS.detail(id),
    queryFn: () => CAR_API.detail(id),
    enabled: !!id,
  });
