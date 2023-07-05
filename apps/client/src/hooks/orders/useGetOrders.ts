import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IOrder } from "@/interfaces/Order";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<IOrder>>;

export const useGetOrders = indexRequestHelper<Response>((query) => {
  return useQuery<Response>(["orders"], () => {
    return api({
      url: `/orders?${new URLSearchParams(query).toString()}`,
    });
  });
});
