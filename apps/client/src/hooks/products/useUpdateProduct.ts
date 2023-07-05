import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IProductUpdate, IProductUpdateError } from "@/interfaces/Product";

type Payload = {
  id: number;
  data: IProductUpdate;
};

export const useUpdateProduct = () => {
  const mutationFn = ({ id, data }: Payload) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key === "images") {
        (value as File[]).forEach((file) => {
          formData.append(key, file);
        });

        return;
      }

      if (value !== undefined && key !== "images") {
        formData.append(key, value.toString());
      }
    });

    return api({
      url: `/products/${id}`,
      method: "PATCH",
      data: formData,
    });
  };

  return useMutation<AxiosResponse, IProductUpdateError, Payload>({
    mutationFn,
  });
};
