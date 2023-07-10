import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";
import { IUserDeleteError } from "@/interfaces/User";

export const useDeleteUser = () => {
  const { toast } = useToast();

  return useMutation<AxiosResponse, IUserDeleteError, number>({
    mutationFn: (id: number) => {
      return api({
        url: `/users/${id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast(handleSuccess("User deleted successfully"));
    },
    onError: (error: IUserDeleteError) => {
      toast(handleError(error));
    },
  });
};
