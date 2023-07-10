import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUnitCreate, IUnitCreateError } from "@/interfaces/Unit";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useStoreUnit = () => {
  const { toast } = useToast();

  const mutationFn = (data: IUnitCreate) => {
    return api({
      url: "/units",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, IUnitCreateError, IUnitCreate>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Unit created successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
