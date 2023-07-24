import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IOrderState } from "@/interfaces/Order";

interface Response extends AxiosResponse {
  data: IOrderState[];
}

export const useGetOrderStates = () => {
  return useQuery<Response>({
    queryKey: ["states"],
    queryFn: () => {
      return api({
        url: "/orders/states",
      });
    },
  });
};
