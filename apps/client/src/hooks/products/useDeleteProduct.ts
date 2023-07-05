import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/api";

export const useDeleteProduct = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id: number) =>
      api({
        url: `/products/${id}`,
        method: "DELETE",
      }),
  });
};
