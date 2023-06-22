import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Paginate, Query, Tag } from "..";

const useGetTags = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/tags?${new URLSearchParams(params).toString()}`;

  return useQuery<AxiosResponse<Paginate<Tag>>>(["tags"], () =>
    api({
      url,
    })
  );
};

export default useGetTags;
