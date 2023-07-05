import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUnitCreate, IUnitCreateError } from "@/interfaces/Unit";

export const useStoreUnit = () => {
  return useMutation<AxiosResponse, IUnitCreateError, IUnitCreate>({
    mutationFn: (data) => {
      return api({
        url: "/units",
        method: "POST",
        data,
      });
    },
  });
};
