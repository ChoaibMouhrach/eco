import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";
import { ITagDeleteError } from "@/interfaces/Tag";

export const useDeleteTag = () => {
  const { toast } = useToast();

  const mutationFn = (id: number) => {
    return api({
      url: `/tags/${id}`,
      method: "DELETE",
    });
  };

  return useMutation<AxiosResponse, ITagDeleteError, number>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Tag deleted successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
