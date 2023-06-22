import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { UpdateCategoryData, UpdateCategoryError } from "..";

const useUpdateCategory = () => {
  return useMutation<
    AxiosResponse,
    UpdateCategoryError,
    { id: number; data: UpdateCategoryData }
  >({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) =>
      api({
        url: `/categories/${id}`,
        method: "PATCH",
        data,
      }),
  });
};

export default useUpdateCategory;
