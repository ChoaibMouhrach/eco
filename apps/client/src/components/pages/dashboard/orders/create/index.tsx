import { useState } from "react";
import { useRouter } from "next/router";
import { useGetProducts, useGetUsers } from "@/hooks";
import { Form } from "./Form";
import { FormSkelton } from "../FormSkelton";

export default function CreateOrdersPage() {
  const router = useRouter();
  const [usersSearch, setUsersSearch] = useState<string>("");
  const [productsSearch, setProductsSearch] = useState<string>("");

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProducts(
    {
      search: productsSearch,
    },
    {
      keepPreviousData: true,
    }
  );

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsers(
    {
      search: usersSearch,
    },
    { keepPreviousData: true }
  );

  if (isUsersLoading || isProductsLoading) {
    return <FormSkelton />;
  }

  if (isUsersError || isProductsError) {
    return router.push("/404");
  }

  return (
    <Form
      products={products.data}
      users={users.data}
      setUsersSearch={setUsersSearch}
      setProductsSearch={setProductsSearch}
    />
  );
}
