import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { ITagCreate, ITagCreateError } from "@/interfaces/Tag";

export const useStoreTag = () => {
  return useMutation<AxiosResponse, ITagCreateError, ITagCreate>({
    mutationFn: (data: ITagCreate) =>
      api({
        url: "/tags",
        method: "POST",
        data,
      }),
  });
};
