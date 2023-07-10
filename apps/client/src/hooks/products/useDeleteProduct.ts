import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { IProductDeleteError } from "@/interfaces/Product";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useDeleteProduct = () => {
  const { toast } = useToast();
  return useMutation<AxiosResponse, IProductDeleteError, number>({
    mutationFn: (id: number) => {
      return api({
        url: `/products/${id}`,
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast(handleSuccess("Product deleted successfully."));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
