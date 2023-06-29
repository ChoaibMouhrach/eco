import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { SignInData, SignInError } from "@/interfaces/User";

export const useSignIn = () =>
  useMutation<AxiosResponse, SignInError, SignInData>({
    mutationFn: (data: SignInData) =>
      api({
        url: "/sign-in",
        method: "POST",
        data,
      }),
  });
