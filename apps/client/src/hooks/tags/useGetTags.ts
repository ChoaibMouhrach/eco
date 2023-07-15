import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { ITag } from "@/interfaces/Tag";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<ITag>>;

export const useGetTags = indexRequestHelper<Response>((query, options) => {
  return useQuery<Response>({
    queryKey: ["tags"],
    queryFn: () => {
      return api({
        url: `/tags?${new URLSearchParams(query).toString()}`,
      });
    },
    ...options,
  });
});
