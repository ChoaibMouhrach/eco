import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IUnit } from "@/interfaces/Unit";
import indexRequestHelper from "@/lib/hookHelper";

type Response = AxiosResponse<IPaginate<IUnit>>;

export const useGetUnits = indexRequestHelper<Response>((query) => {
  return useQuery<Response>(["units"], () => {
    return api({
      url: `/units?${new URLSearchParams(query).toString()}`,
    });
  });
});
