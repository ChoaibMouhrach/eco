import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Combox, { ComboxItem } from "@/components/ui/Combox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetProducts, useGetUsers, useUpdateOrder } from "@/hooks";
import { IOrder, IOrderUpdate, IOrderUpdateError } from "@/interfaces/Order";
import { IProduct } from "@/interfaces/Product";
import { IUser } from "@/interfaces/User";
import debounce from "@/lib/debounce";
import { ProductsTable } from "./ProductsTable";
import LoadingButton from "@/components/ui/LoadingButton";

interface UpdateOrderPageProps {
  order: IOrder;
  defaultProducts: IProduct[];
  defaultUsers: IUser[];
}

const schema = z.object({
  userId: z.number().int().positive().gt(0).optional(),
  products: z
    .array(
      z.object({
        id: z.number().int().positive().gt(0),
        orderQuantity: z.number().int().positive().gt(0),
      })
    )
    .optional(),
});

export default function UpdateOrderPage({
  order,
  defaultUsers,
  defaultProducts,
}: UpdateOrderPageProps) {
  const [alrtOpen, setAlrtOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>(defaultProducts);
  const [users, setUsers] = useState<IUser[]>(defaultUsers);

  const [productSearch, setProductSearch] = useState({
    value: "",
    changed: false,
  });

  const [usersSearch, setUserSearch] = useState({
    value: `${order.user.firstName} ${order.user.lastName}`,
    changed: false,
  });

  const form = useForm<IOrderUpdate>({
    resolver: zodResolver(schema),
    defaultValues: {
      products: order.items.map((item) => ({
        ...item.product,
        orderQuantity: item.quantity,
      })),
    },
  });

  const { data: newProducts, refetch: refetchNewProducts } = useGetProducts(
    {
      search: productSearch.value,
    },
    {
      enabled: false,
    }
  );

  const { data: newUsers, refetch: refetchNewUsers } = useGetUsers(
    {
      search: usersSearch.value,
    },
    {
      enabled: false,
    }
  );

  const fetchProducts = useCallback(
    debounce(() => refetchNewProducts()),
    []
  );
  const fetchUsers = useCallback(
    debounce(() => refetchNewUsers()),
    []
  );

  const { mutate: updateOrder, isLoading } = useUpdateOrder();

  // handlers
  const handleErrors = (err: IOrderUpdateError) => {
    if (err.response.data.content instanceof Array) {
      const issues = err.response.data.content;
      issues.forEach((issue) => {
        form.setError(issue.path[0], {
          message: issue.message,
        });
      });
    }
  };

  const onSubmit = (data: IOrderUpdate) => {
    updateOrder(
      {
        id: order.id,
        data: {
          ...data,
          products: data.products?.map((product) => ({
            id: product.id,
            quantity: product.orderQuantity,
          })),
        },
      },
      {
        onError: handleErrors,
        onSettled: () => setAlrtOpen(false),
      }
    );
  };

  const handleAddProduct = (product: IProduct) => {
    if (form.getValues("products")?.find((p) => p.id === product.id)) {
      form.setValue(
        "products",
        form.getValues("products")!.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              orderQuantity: p.orderQuantity + 1,
            };
          }

          return p;
        })
      );

      return;
    }

    form.setValue("products", [
      ...(form.getValues("products") ?? []),
      {
        ...product,
        orderQuantity: 1,
      },
    ]);
  };

  // useEffects
  useEffect(() => {
    if (productSearch.changed) {
      fetchProducts();
    }
  }, [productSearch]);

  useEffect(() => {
    if (usersSearch.changed) {
      fetchUsers();
    }
  }, [usersSearch]);

  useEffect(() => {
    if (newUsers) {
      setUsers(newUsers.data.data);
    }
  }, [newUsers]);

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
              <FormLabel>Order owner</FormLabel>
              <FormControl>
                <Combox
                  itemCount={users.length}
                  onValueChange={(value: string) => {
                    setUserSearch({
                      value,
                      changed: true,
                    });
                  }}
                  value={usersSearch.value}
                >
                  {users.map((user) => (
                    <ComboxItem
                      key={user.id}
                      onClick={() => {
                        setUserSearch({
                          value: `${user.firstName} ${user.lastName}`,
                          changed: true,
                        });
                        form.setValue("userId", user.id);
                      }}
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>
                Change the order owner to the desired user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="products"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Order Products</FormLabel>
              <FormControl>
                <Combox
                  itemCount={products.length}
                  onValueChange={(value: string) => {
                    setProductSearch({
                      value,
                      changed: true,
                    });
                  }}
                  value={productSearch.value}
                >
                  {products.map((product) => (
                    <ComboxItem
                      key={product.id}
                      onClick={() => handleAddProduct(product)}
                    >
                      {product.name}
                    </ComboxItem>
                  ))}
                </Combox>
              </FormControl>
              <FormDescription>
                Select products to be added to the order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-fit"
          type="button"
          onClick={() => setAlrtOpen(true)}
        >
          Update Category
        </Button>

        <AlertDialog open={alrtOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently update this
                order.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlrtOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                {isLoading ? (
                  <LoadingButton>Updating</LoadingButton>
                ) : (
                  <Button onClick={form.handleSubmit(onSubmit)}>Update</Button>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
      <ProductsTable form={form} items={form.watch("products") ?? []} />
    </Form>
  );
}
