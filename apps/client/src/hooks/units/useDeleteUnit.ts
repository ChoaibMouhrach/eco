import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { IUnitDeleteError } from "@/interfaces/Unit";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useDeleteUnit = () => {
  const { toast } = useToast();

  const mutationFn = (id: number) => {
    return api({
      url: `/units/${id}`,
      method: "DELETE",
    });
  };

  return useMutation<AxiosResponse, IUnitDeleteError, number>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Unit deleted successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
