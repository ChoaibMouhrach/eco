import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Paginate, Product, Query } from "..";

const useGetProducts = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/products?${new URLSearchParams(params).toString()}`;

  return useQuery<AxiosResponse<Paginate<Product>>>(["products"], () =>
    api({
      url,
    })
  );
};

export default useGetProducts;
