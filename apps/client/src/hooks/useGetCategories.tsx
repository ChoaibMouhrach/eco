import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ICategory } from "@/interfaces/Category";
import { IPaginate } from "@/interfaces/Common";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<ICategory>>;

export const useGetCategories = indexRequestHelper<Response>(
  (query, options) => {
    return useQuery<Response>({
      queryKey: ["categories"],
      queryFn: () => {
        return api({
          url: `/categories?${new URLSearchParams(query).toString()}`,
        });
      },
      ...options,
    });
  }
);
