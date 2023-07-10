import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ICategoryStore, ICategoryStoreError } from "@/interfaces/Category";
import { toast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useStoreCategory = () => {
  const mutationFn = (data: ICategoryStore) => {
    return api({
      url: "/categories",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, ICategoryStoreError, ICategoryStore>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Category created successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
