import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUserUpdate, IUserUpdateError } from "@/interfaces/User";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/lib/httpMutationHelper";

type Payload = {
  id: number;
  data: IUserUpdate;
};

export const useUpdateUser = () => {
  const { toast } = useToast();

  const mutationFn = ({ id, data }: Payload) => {
    return api({
      url: `/users/${id}`,
      method: "PATCH",
      data,
    });
  };

  return useMutation<AxiosResponse, IUserUpdateError, Payload>({
    mutationFn,
    onSuccess: () => {
      toast(handleSuccess("User Updated successfully"));
    },
    onError: (error) => {
      toast(handleError(error));
    },
  });
};
