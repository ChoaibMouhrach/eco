import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IUnitUpdate, IUnitUpdateError } from "@/interfaces/Unit";

export const useUpdateUnit = () => {
  return useMutation<
    AxiosResponse,
    IUnitUpdateError,
    { id: number; data: IUnitUpdate }
  >({
    mutationFn: ({ id, data }) =>
      api({
        url: `/units/${id}`,
        method: "PATCH",
        data,
      }),
  });
};
