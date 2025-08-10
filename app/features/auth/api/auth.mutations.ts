import { useMutation } from "@tanstack/react-query";
import type { AuthCredentials } from "../types/auth.types";
import { authApi } from "./auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: AuthCredentials) => authApi.login(data),
  });
};

export const useGetMeMutation = () => {
  return useMutation({
    mutationFn: () => authApi.getMe(),
  });
};
