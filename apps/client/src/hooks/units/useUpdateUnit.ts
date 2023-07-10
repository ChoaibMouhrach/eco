import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUnitUpdate, IUnitUpdateError } from "@/interfaces/Unit";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

interface Payload {
  id: number;
  data: IUnitUpdate;
}

export const useUpdateUnit = () => {
  const { toast } = useToast();

  const mutationFn = ({ id, data }: Payload) => {
    return api({
      url: `/units/${id}`,
      method: "PATCH",
      data,
    });
  };

  return useMutation<AxiosResponse, IUnitUpdateError, Payload>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Unit updated successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
