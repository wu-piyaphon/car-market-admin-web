import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/lib/query-client";
import { CAR_API } from "./car.api";
import { CAR_KEYS } from "./car.keys";

export const useCreateCarMutation = () =>
  useMutation({
    mutationFn: (data: FormData) => CAR_API.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CAR_KEYS.list] });
    },
  });

export const useUpdateCarMutation = () =>
  useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      CAR_API.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CAR_KEYS.list] });
    },
  });

export const useActivateCarMutation = () => {
  return useMutation({
    mutationFn: (id: string) => CAR_API.activate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CAR_KEYS.list] });
    },
  });
};

export const useDisableCarMutation = () => {
  return useMutation({
    mutationFn: (id: string) => CAR_API.disable(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CAR_KEYS.list] });
    },
  });
};

export const useDeleteCarMutation = () => {
  return useMutation({
    mutationFn: (id: string) => CAR_API.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CAR_KEYS.list] });
    },
  });
};
