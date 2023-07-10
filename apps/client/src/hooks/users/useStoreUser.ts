import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUserCreate, IUserCreateError } from "@/interfaces/User";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useStoreUser = () => {
  const { toast } = useToast();

  const mutationFn = (data: IUserCreate) => {
    return api({
      url: "/users",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, IUserCreateError, IUserCreate>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("User created successfully"));
    },
    onError: (error: IUserCreateError) => {
      toast(handleError(error));
    },
  });
};
