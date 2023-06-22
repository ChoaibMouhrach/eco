import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Order, Paginate, Query } from "..";

const useGetOrders = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/orders?${new URLSearchParams(params).toString()}`;

  return useQuery<AxiosResponse<Paginate<Order>>>(["orders"], () =>
    api({
      url,
    })
  );
};

export default useGetOrders;
