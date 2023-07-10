import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";
import { ICategoryDeleteError } from "@/interfaces/Category";

export const useDeleteCategory = () => {
  const { toast } = useToast();

  const mutationFn = (id: number) => {
    return api({
      url: `/categories/${id}`,
      method: "DELETE",
    });
  };

  return useMutation<AxiosResponse, ICategoryDeleteError, number>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Category deleted successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
