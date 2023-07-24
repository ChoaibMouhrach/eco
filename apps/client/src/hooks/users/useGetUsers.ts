import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IUser } from "@/interfaces/User";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<IUser>>;

export const useGetUsers = indexRequestHelper<Response>((query, options) => {
  return useQuery<Response>({
    queryKey: ["users", query],
    queryFn: () => {
      return api({
        url: `/users?${new URLSearchParams(query).toString()}`,
      });
    },
    ...options,
  });
});
