import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IOrderCreate, IOrderCreateError } from "@/interfaces/Order";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useStoreOrder = () => {
  const { toast } = useToast();

  const mutationFn = (data: IOrderCreate) => {
    return api({
      url: "/orders",
      method: "POST",
      data: {
        userId: data.userId,
        products: data.products.map((product) => ({
          id: product.id,
          quantity: product.orderQuantity,
        })),
      },
    });
  };

  return useMutation<AxiosResponse, IOrderCreateError, IOrderCreate>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Order created successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
