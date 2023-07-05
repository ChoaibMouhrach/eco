import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IProduct } from "@/interfaces/Product";
import { IUser } from "@/interfaces/User";
import { IOrderCreate } from "@/interfaces/Order";
import { useGetProducts, useGetUsers } from "@/hooks";
import debounce from "@/lib/debounce";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Combox, { ComboxItem } from "@/components/ui/Combox";

interface CreateOrderPageProps {
  defaultUsers: IUser[];
  defaultProducts: IProduct[];
}

const schema = z.object({
  userId: z.number().int().positive(),
  products: z.array(
    z.object({
      id: z.number().int().positive(),
      quantity: z.number().int().positive().gt(0),
    })
  ),
});

export default function DashboardCreateOrderPage({
  defaultUsers,
  defaultProducts,
}: CreateOrderPageProps) {
  const [users, setUsers] = useState<IUser[]>(defaultUsers);
  const [products, setProducts] = useState<IProduct[]>(defaultProducts);

  const [usersSearch, setUsersSearch] = useState({
    value: "",
    changed: false,
  });

  const [productsSearch, setProductsSearch] = useState({
    value: "",
    changed: false,
  });

  const form = useForm<IOrderCreate>({
    resolver: zodResolver(schema),
  });

  const { data: newUsers, refetch: refetchNewUsers } = useGetUsers(
    {
      search: usersSearch.value,
    },
    { enabled: false }
  );

  const { data: newProducts, refetch: refetchNewProducts } = useGetProducts(
    {
      search: usersSearch.value,
    },
    { enabled: false }
  );

  // handlers
  const onSubmit = (data: IOrderCreate) => {
    console.log(data);
  };

  const replaceUsers = debounce(() => refetchNewUsers());
  const replaceProducts = debounce(() => refetchNewProducts());

  // useEffects
  useEffect(() => {
    if (usersSearch.changed) {
      replaceUsers();
    }
  }, [usersSearch]);

  useEffect(() => {
    if (newUsers) {
      setUsers(newUsers.data.data);
    }
  }, [newUsers]);

  useEffect(() => {
    if (productsSearch.changed) {
      replaceProducts();
    }
  }, [productsSearch]);

  useEffect(() => {
    if (newProducts) {
      setProducts(newProducts.data.data);
    }
  }, [newProducts]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          name="userId"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <Combox
                  onValueChange={(value: string) => {
                    setUsersSearch({
                      value,
                      changed: true,
                    });
                  }}
                  value={usersSearch.value}
                  itemCount={users.length}
                >
                  {users.map((user) => (
                    <ComboxItem
                      key={user.id}
                      onClick={() => form.setValue("userId", user.id)}
                    >
                      <div className="flex items-center gao-2">
                        <span>{user.firstName}</span>
                        <span>{user.lastName}</span>
                      </div>
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>Choose order owner</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Products</FormLabel>
          <FormControl>
            <Combox
              onValueChange={(value: string) => {
                setProductsSearch({
                  value,
                  changed: true,
                });
              }}
              value={productsSearch.value}
              itemCount={products.length}
            >
              {products.map((product) => (
                <ComboxItem
                  key={product.id}
                  onClick={() =>
                    form.setValue("products", [
                      { ...product, orderQuantity: 1 },
                    ])
                  }
                >
                  <div className="flex items-center gao-2">{product.name}</div>
                </ComboxItem>
              ))}
            </Combox>
          </FormControl>
          <FormDescription>Choose order products.</FormDescription>
          <FormMessage />
        </FormItem>
      </form>
    </Form>
  );
}
