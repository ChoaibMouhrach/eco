import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IPurchase } from "@/interfaces/Purchase";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<IPurchase>>;

export const useGetPurchases = indexRequestHelper<Response>((query) => {
  return useQuery<Response>(["purchases"], () => {
    return api({
      url: `/purchases?${new URLSearchParams(query).toString()}`,
    });
  });
});
