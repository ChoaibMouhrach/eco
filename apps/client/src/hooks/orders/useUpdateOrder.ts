import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IOrderUpdateError } from "@/interfaces/Order";

type Payload = {
  id: number;
  data: {
    userId?: number;
    products?: { id: number; quantity: number }[];
  };
};

export const useUpdateOrder = () => {
  const mutationFn = ({ id, data }: Payload) => {
    return api({
      url: `/orders/${id}`,
      method: "PATCH",
      data,
    });
  };

  return useMutation<AxiosResponse, IOrderUpdateError, Payload>({
    mutationFn,
  });
};
