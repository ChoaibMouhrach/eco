import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { CreateUnitData, CreateUnitError } from "..";

const useStoreUnit = () => {
  return useMutation<AxiosResponse, CreateUnitError, CreateUnitData>({
    mutationFn: (data: CreateUnitData) =>
      api({
        url: "/units",
        method: "POST",
        data,
      }),
  });
};

export default useStoreUnit;
