import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/lib/api";
import { Paginate, StoreTagData, StoreTagError, Tag } from "..";

const useStoreTag = () =>
  useMutation<AxiosResponse<Paginate<Tag>>, StoreTagError, StoreTagData>({
    mutationFn: (data: StoreTagData) =>
      api({
        url: "/tags",
        method: "POST",
        data,
      }),
  });

export default useStoreTag;
