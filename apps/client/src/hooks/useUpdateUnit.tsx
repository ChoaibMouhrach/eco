import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { UpdateUnitData, UpdateUnitError } from "..";

const useUpdateUnit = () => {
  return useMutation<
    AxiosResponse,
    UpdateUnitError,
    { id: number; data: UpdateUnitData }
  >({
    mutationFn: ({ id, data }: { id: number; data: UpdateUnitData }) =>
      api({
        url: `/units/${id}`,
        method: "PATCH",
        data,
      }),
  });
};

export default useUpdateUnit;
