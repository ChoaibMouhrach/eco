import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<IProduct>>;

export const useGetProducts = indexRequestHelper<Response>((query) => {
  return useQuery(["products"], () => {
    return api({
      url: `/products?${new URLSearchParams(query).toString()}`,
    });
  });
});
