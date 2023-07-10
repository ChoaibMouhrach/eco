import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { SignInData, SignInError } from "@/interfaces/User";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";
import { useToast } from "@/components/ui/use-toast";

export const useSignIn = () => {
  const { toast } = useToast();

  const mutationFn = (data: SignInData) => {
    return api({
      url: "/sign-in",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, SignInError, SignInData>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Please check your email for sign in email"));
    },
    onError: (err) => {
      toast(handleError(err));
    },
  });
};
