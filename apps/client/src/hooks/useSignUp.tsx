import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { SignUpData, SignUpDataError } from "..";

const useSignUp = () =>
  useMutation<AxiosResponse, SignUpDataError, SignUpData>({
    mutationFn: (data: SignUpData) =>
      api({
        url: "/sign-up",
        method: "POST",
        data,
      }),
  });

export default useSignUp;
