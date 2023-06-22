import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/lib/api";

const useDestroyUnit = () => {
  return useMutation<AxiosResponse, AxiosError, number>({
    mutationFn: (id: number) =>
      api({
        url: `/units/${id}`,
        method: "DELETE",
      }),
  });
};

export default useDestroyUnit;
