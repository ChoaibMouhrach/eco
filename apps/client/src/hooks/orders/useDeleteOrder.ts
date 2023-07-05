import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/api";

export const useDeleteOrder = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id: number) => {
      return api({
        url: `/orders/${id}`,
        method: "DELETE",
      });
    },
  });
};
