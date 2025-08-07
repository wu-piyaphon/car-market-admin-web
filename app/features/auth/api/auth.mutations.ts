import { useMutation } from "@tanstack/react-query";
import type { AuthCredentials } from "../types/auth.types";
import { AUTH_API } from "./auth.api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: AuthCredentials) => AUTH_API.login(data),
  });
};
