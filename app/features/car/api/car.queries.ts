import { skipToken, useQuery } from "@tanstack/react-query";
import type { CarListSearchQuery } from "../types/car.types";
import { CAR_API } from "./car.api";
import { CAR_KEYS } from "./car.keys";

export const useGetCars = (query: CarListSearchQuery) =>
  useQuery({
    queryKey: CAR_KEYS.list(),
    queryFn: () => CAR_API.list(query),
  });

export const useGetCarDetail = (id: string | undefined) =>
  useQuery({
    queryKey: CAR_KEYS.detail(id),
    queryFn: id ? () => CAR_API.detail(id) : skipToken,
  });

export const useGetBrands = () =>
  useQuery({
    queryKey: CAR_KEYS.brands(),
    queryFn: () => CAR_API.brands(),
  });

export const useGetCategories = () =>
  useQuery({
    queryKey: CAR_KEYS.categories(),
    queryFn: () => CAR_API.categories(),
  });

export const useGetTypes = () =>
  useQuery({
    queryKey: CAR_KEYS.types(),
    queryFn: () => CAR_API.types(),
  });
