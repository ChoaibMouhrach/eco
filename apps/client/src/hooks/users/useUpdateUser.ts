import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUserUpdate, IUserUpdateError } from "@/interfaces/User";

type Payload = {
  id: number;
  data: IUserUpdate;
};

export const useUpdateUser = () => {
  return useMutation<AxiosResponse, IUserUpdateError, Payload>({
    mutationFn: ({ id, data }: Payload) =>
      api({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
  });
};
