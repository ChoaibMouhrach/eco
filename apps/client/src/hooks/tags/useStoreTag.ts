import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ITagCreate, ITagCreateError } from "@/interfaces/Tag";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

export const useStoreTag = () => {
  const { toast } = useToast();

  const mutationFn = (data: ITagCreate) => {
    return api({
      url: "/tags",
      method: "POST",
      data,
    });
  };

  return useMutation<AxiosResponse, ITagCreateError, ITagCreate>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("Tag created successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
