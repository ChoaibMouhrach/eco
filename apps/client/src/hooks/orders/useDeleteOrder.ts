import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";
import { IOrderDeleteError } from "@/interfaces/Order";

export const useDeleteOrder = () => {
  const { toast } = useToast();

  const mutationFn = (id: number) => {
    return api({
      url: `/orders/${id}`,
      method: "DELETE",
    });
  };

  return useMutation<AxiosResponse, IOrderDeleteError, number>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Order deleted successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
