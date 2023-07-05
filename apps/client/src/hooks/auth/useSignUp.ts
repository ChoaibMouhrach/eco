import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { SignUpData, SignUpError } from "@/interfaces/User";

export const useSignUp = () => {
  return useMutation<AxiosResponse, SignUpError, SignUpData>({
    mutationFn: (data: SignUpData) =>
      api({
        url: "/sign-up",
        method: "POST",
        data,
      }),
  });
};
