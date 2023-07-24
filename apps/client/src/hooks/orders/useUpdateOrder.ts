import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IOrderUpdateError } from "@/interfaces/Order";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

type Payload = {
  id: number;
  data: {
    userId?: number;
    items?: { id: number; quantity: number }[];
  };
};

export const useUpdateOrder = () => {
  const { toast } = useToast();

  const mutationFn = ({ id, data }: Payload) => {
    return api({
      url: `/orders/${id}`,
      method: "PATCH",
      data,
    });
  };

  return useMutation<AxiosResponse, IOrderUpdateError, Payload>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Order updated successfully"));
    },
    onError: (err) => {
      toast(handleError(err));
    },
  });
};
