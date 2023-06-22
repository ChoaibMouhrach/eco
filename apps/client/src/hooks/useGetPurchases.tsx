import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Query } from "..";

const useGetPurchase = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/purchases?${new URLSearchParams(params).toString()}`;

  return useQuery(["purchases"], () =>
    api({
      url,
    })
  );
};

export default useGetPurchase;
