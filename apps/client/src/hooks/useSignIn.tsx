import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { SignInData, SignInDataError } from "..";

const useSignIn = () => {
  return useMutation<AxiosResponse, SignInDataError, SignInData>({
    mutationFn: (data: SignInData) =>
      api({
        url: "/sign-in",
        method: "POST",
        data,
      }),
  });
};

export default useSignIn;
