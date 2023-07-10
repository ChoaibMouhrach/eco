import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ITagUpdate, ITagUpdateError } from "@/interfaces/Tag";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

interface Payload {
  id: number;
  data: ITagUpdate;
}

export const useUpdateTag = () => {
  const { toast } = useToast();

  const mutationFn = ({ id, data }: Payload) => {
    return api({
      url: `/tags/${id}`,
      method: "PATCH",
      data,
    });
  };

  return useMutation<AxiosResponse, ITagUpdateError, Payload>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Tag updated successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
