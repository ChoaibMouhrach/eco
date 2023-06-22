import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Paginate, Query, User } from "..";

const useGetUsers = ({ search, page }: Query) => {
  const params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = String(page + 1);
  }

  const url = `/users?${new URLSearchParams(params).toString()}`;

  return useQuery<AxiosResponse<Paginate<User>>>(["users"], () =>
    api({
      url,
    })
  );
};

export default useGetUsers;
