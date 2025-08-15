import { useQuery } from "@tanstack/react-query";
import { CAR_API } from "./car.api";
import { CAR_KEYS } from "./car.keys";

export const useGetCars = () =>
  useQuery({
    queryKey: CAR_KEYS.list,
    queryFn: () => CAR_API.list(),
  });

export const useGetCarDetail = (id: string) =>
  useQuery({
    queryKey: CAR_KEYS.detail(id),
    queryFn: () => CAR_API.detail(id),
    enabled: !!id,
  });
