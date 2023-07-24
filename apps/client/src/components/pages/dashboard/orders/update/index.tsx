import { useRouter } from "next/router";
import { useState } from "react";
import {
  useGetOrderStates,
  useGetProducts,
  useGetUsers,
  useShowOrder,
} from "@/hooks";
import { FormSkelton } from "../FormSkelton";
import { UpdateForm } from "./Form";

export default function UpdateOrderPage() {
  const { id } = useRouter().query;

  const [productsSearch, setProductsSearch] = useState<string>("");
  const [usersSearch, setUsersSearch] = useState<string>("");

  const { data: states, isSuccess: isStatesSuccess } = useGetOrderStates();
  const { data: order, isSuccess: isOrderSuccess } = useShowOrder(Number(id));
  const { data: products, isSuccess: isProductsSuccess } = useGetProducts(
    {
      search: productsSearch,
    },
    { keepPreviousData: true }
  );
  const { data: users, isSuccess: isUsersSuccess } = useGetUsers(
    {
      search: usersSearch,
    },
    { keepPreviousData: true }
  );

  if (
    isOrderSuccess &&
    isStatesSuccess &&
    isProductsSuccess &&
    isUsersSuccess
  ) {
    return (
      <UpdateForm
        order={order.data}
        states={states.data}
        products={products.data}
        users={users.data}
        setProductsSearch={setProductsSearch}
        setUsersSearch={setUsersSearch}
      />
    );
  }

  return <FormSkelton />;
}
