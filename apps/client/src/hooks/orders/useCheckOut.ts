import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { CardData, CheckOutError, CheckOutResponse } from "@/interfaces/Order";
import { useCart } from "../useCart";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useCheckOut = () => {
  const { toast } = useToast();
  const { data: cartItems } = useCart();

  const mutationFn = (card: CardData) => {
    return api({
      url: "/checkout",
      method: "POST",
      data: {
        card,
        items: cartItems.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      },
    });
  };

  return useMutation<CheckOutResponse, CheckOutError, CardData>({
    mutationFn,
    onError: (error) => {
      toast(handleError(error));
    },
    onSuccess: (response) => {
      if (response.status === 201)
        toast(handleSuccess("Order placed successfully"));
    },
  });
};
