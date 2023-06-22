import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UpdateTagData, UpdateTagError } from "..";
import api from "@/lib/api";

const useUpdateTag = () =>
  useMutation<
    AxiosResponse,
    UpdateTagError,
    { id: number; data: UpdateTagData }
  >({
    mutationFn: ({ id, data }: { id: number; data: UpdateTagData }) =>
      api({
        url: `/tags/${id}`,
        method: "PATCH",
        data,
      }),
  });

export default useUpdateTag;
