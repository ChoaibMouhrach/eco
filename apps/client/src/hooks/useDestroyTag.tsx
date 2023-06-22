import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/lib/api";

export const useDestroyTag = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id: number) => {
      return api({
        url: `/tags/${id}`,
        method: "DELETE",
      });
    },
  });
};

export default useDestroyTag;
