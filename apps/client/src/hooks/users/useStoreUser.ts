import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUserCreate, IUserCreateError } from "@/interfaces/User";

export const useStoreUser = () => {
  return useMutation<AxiosResponse, IUserCreateError, IUserCreate>({
    mutationFn: (data: IUserCreate) =>
      api({
        url: "/users",
        method: "POST",
        data,
      }),
  });
};
