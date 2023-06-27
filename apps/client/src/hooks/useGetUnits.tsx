import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Paginate, Query, Unit } from "..";

const useGetUnits = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/units?${new URLSearchParams(params).toString()}`;

  return useQuery<AxiosResponse<Paginate<Unit>>>(["units"], () =>
    api({
      url,
    })
  );
};

export default useGetUnits;
