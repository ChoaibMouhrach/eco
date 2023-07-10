import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { SignUpData, SignUpError } from "@/interfaces/User";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useSignUp = () => {
  const { toast } = useToast();

  const mutationFn = (data: SignUpData) => {
    return api({
      url: "/sign-up",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, SignUpError, SignUpData>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Please check your email for sign in email"));
    },
    onError: (err) => {
      toast(handleError(err));
    },
  });
};
