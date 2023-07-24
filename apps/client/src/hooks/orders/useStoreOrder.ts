import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IOrderCreate, IOrderCreateError } from "@/interfaces/Order";
import { useToast } from "@/components/ui/use-toast";
import api from "@/api";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useStoreOrder = () => {
  const { toast } = useToast();

  const mutationFn = (data: IOrderCreate) => {
    return api({
      url: "/orders",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, IOrderCreateError, IOrderCreate>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Order placed successfully"));
    },
    onError: (err) => {
      toast(handleError(err));
    },
  });
};
