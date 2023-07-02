import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ICategoryStore, ICategoryStoreError } from "@/interfaces/Category";

export const useStoreCategory = () => {
  return useMutation<AxiosResponse, ICategoryStoreError, ICategoryStore>({
    mutationFn: (data: ICategoryStore) =>
      api({
        url: "/categories",
        method: "POST",
        data,
      }),
  });
};
