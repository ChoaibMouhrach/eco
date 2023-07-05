import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { IProductCreate, IProductCreateError } from "@/interfaces/Product";

export const useStoreProduct = () => {
  const mutationFn = (data: IProductCreate) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("unitId", data.unitId.toString());
    formData.append("categoryId", data.categoryId.toString());
    formData.append("tags", data.tags);
    data.images.forEach((image) => {
      formData.append("images", image);
    });

    return api({
      url: "/products",
      method: "POST",
      data: formData,
    });
  };

  return useMutation<AxiosResponse, IProductCreateError, IProductCreate>({
    mutationFn,
  });
};
