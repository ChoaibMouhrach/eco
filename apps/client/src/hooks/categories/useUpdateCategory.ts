import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ICategoryUpdate, ICategoryUpdateError } from "@/interfaces/Category";

export const useUpdateCategory = () => {
  return useMutation<
    AxiosResponse,
    ICategoryUpdateError,
    { id: number; data: ICategoryUpdate }
  >({
    mutationFn: ({ id, data }: { id: number; data: ICategoryUpdate }) => {
      return api({
        url: `/categories/${id}`,
        method: "PATCH",
        data,
      });
    },
  });
};
