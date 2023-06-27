import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { CreateCategoryData, CreateCategoryError } from "..";

const useStoreCategory = () => {
  return useMutation<AxiosResponse, CreateCategoryError, CreateCategoryData>({
    mutationFn: (data: CreateCategoryData) => {
      return api({
        url: "/categories",
        method: "POST",
        data,
      });
    },
  });
};

export default useStoreCategory;
