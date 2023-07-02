import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/api";

export const useDeleteCategory = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id: number) =>
      api({
        url: `/categories/${id}`,
      }),
  });
};
