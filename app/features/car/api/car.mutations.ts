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
