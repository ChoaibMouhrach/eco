import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ICategoryUpdate, ICategoryUpdateError } from "@/interfaces/Category";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

interface Payload {
  id: number;
  data: ICategoryUpdate;
}

export const useUpdateCategory = () => {
  const { toast } = useToast();

  const mutationFn = ({ id, data }: Payload) => {
    return api({
      url: `/categories/${id}`,
      method: "PATCH",
      data,
    });
  };

  return useMutation<AxiosResponse, ICategoryUpdateError, Payload>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Category updated successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
