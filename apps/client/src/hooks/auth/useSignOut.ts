import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";
import api from "@/api";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";
import { useToast } from "@/components/ui/use-toast";
import { ISignOutError } from "@/interfaces/User";

export const useSignOut = () => {
  const router = useRouter();
  const { toast } = useToast();

  const mutationFn = () => {
    return api({
      url: "/sign-out",
      method: "POST",
    });
  };

  return useMutation<AxiosResponse, ISignOutError, void>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("See you soon!"));
      router.push("/");
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
