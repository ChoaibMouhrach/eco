import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ITagUpdate, ITagUpdateError } from "@/interfaces/Tag";

interface Payload {
  id: number;
  data: ITagUpdate;
}

export const useUpdateTag = () => {
  return useMutation<AxiosResponse, ITagUpdateError, Payload>({
    mutationFn: ({ id, data }: Payload) => {
      return api({
        url: `/tags/${id}`,
        method: "PATCH",
        data,
      });
    },
  });
};
