import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/lib/api";

const useDestroyCategory = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id: number) => {
      return api({
        url: `/categories/${id}`,
        method: "DELETE",
      });
    },
  });
};

export default useDestroyCategory;
