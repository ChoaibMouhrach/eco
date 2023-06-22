import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Category, Paginate, Query } from "..";

const useGetCategories = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/categories?${new URLSearchParams(params).toString()}`;

  return useQuery<AxiosResponse<Paginate<Category>>>(["categories"], () =>
    api({
      url,
    })
  );
};

export default useGetCategories;
