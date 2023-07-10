import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IProduct } from "@/interfaces/Product";
import { IUser } from "@/interfaces/User";
import { IOrderCreate, IOrderCreateError } from "@/interfaces/Order";
import { useGetProducts, useGetUsers, useStoreOrder } from "@/hooks";
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
import { ProductsTable } from "./productsTable";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";

interface CreateOrderPageProps {
  defaultUsers: IUser[];
  defaultProducts: IProduct[];
}

const schema = z.object({
  userId: z.number().int().positive(),
  products: z.array(
    z.object({
      id: z.number().int().positive(),
      orderQuantity: z.number().int().positive().gt(0),
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
      search: productsSearch.value,
    },
    { enabled: false }
  );

  const { mutate: createOrder, isLoading } = useStoreOrder();

  // handlers

  const handleError = (err: IOrderCreateError) => {
    if (err.response.data.content instanceof Array) {
      err.response.data.content.forEach((error) => {
        form.setError(error.path[0], {
          message: error.message,
        });
      });
    }
  };

  const onSubmit = (data: IOrderCreate) =>
    createOrder(data, {
      onError: handleError,
    });

  const replaceUsers = useCallback(
    debounce(() => {
      refetchNewUsers();
    }),
    []
  );

  const replaceProducts = useCallback(
    debounce(() => {
      refetchNewProducts();
    }),
    []
  );

  const handleAddProduct = (product: IProduct) => {
    const formProducts = form.getValues("products") ?? [];

    if (formProducts.find((p) => p.id === product.id)) {
      const newFormProducts = formProducts.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            orderQuantity: p.orderQuantity + 1,
          };
        }

        return p;
      });

      form.setValue("products", newFormProducts);

      return;
    }

    form.setValue("products", [
      ...(form.getValues("products") ?? []),
      { ...product, orderQuantity: 1 },
    ]);
  };

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
                      onClick={() => {
                        setUsersSearch({
                          value: `${user.firstName} ${user.lastName}`,
                          changed: true,
                        });
                        form.setValue("userId", user.id);
                      }}
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

        <FormField
          name="products"
          control={form.control}
          render={() => (
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
                      onClick={() => handleAddProduct(product)}
                    >
                      <div className="flex items-center gao-2">
                        {product.name}
                      </div>
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>Choose order products.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {isLoading ? (
            <LoadingButton>Create Order</LoadingButton>
          ) : (
            <Button>Create Order</Button>
          )}
        </div>
      </form>

      <ProductsTable products={form.watch().products ?? []} form={form} />
    </Form>
  );
}
