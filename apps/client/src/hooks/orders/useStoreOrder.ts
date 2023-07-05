import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IOrderCreate, IOrderCreateError } from "@/interfaces/Order";

export const useStoreOrder = () => {
  return useMutation<AxiosResponse, IOrderCreateError, IOrderCreate>({
    mutationFn: (data) => {
      return api({
        url: "/orders",
        method: "POST",
        data,
      });
    },
  });
};
