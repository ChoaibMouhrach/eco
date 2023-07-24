import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IOrder } from "@/interfaces/Order";

interface IOrderResponse extends AxiosResponse {
  data: IOrder;
}

export const useShowOrder = (id: number) => {
  return useQuery<IOrderResponse>({
    queryKey: ["order"],
    queryFn: () => {
      return api({
        url: `/orders/${id}`,
      });
    },
  });
};
