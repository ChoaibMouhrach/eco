import { ColumnDef } from "@tanstack/react-table";
import { PiTrashSimpleBold } from "react-icons/pi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { IProduct } from "@/interfaces/Product";
import { Form as FormComponent } from "@/components/ui/form";
import { IPaginate } from "@/interfaces/Common";
import { IUser } from "@/interfaces/User";
import DataTable from "@/components/custom/data/table";
import { Button } from "@/components/ui/button";
import debounce from "@/lib/debounce";
import { Separator } from "@/components/ui/separator";
import { useStoreOrder } from "@/hooks";
import LoadingButton from "@/components/ui/LoadingButton";
import schema from "./schema";
import { IItem, IOrderCreate } from "./interfaces";
import { UserComboBox } from "./fields/UserCombobox";
import { ProductCombobox } from "./fields/ProductCombbobox";

interface FormProps {
  users: IPaginate<IUser>;
  products: IPaginate<IProduct>;

  setProductsSearch: React.Dispatch<React.SetStateAction<string>>;
  setUsersSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function Form({
  users,
  products,
  setProductsSearch,
  setUsersSearch,
}: FormProps) {
  const form = useForm<IOrderCreate>({
    resolver: zodResolver(schema),
  });

  const { mutate: placeOrder, isLoading } = useStoreOrder();

  const onSubmit = (data: IOrderCreate) => {
    placeOrder(
      {
        ...data,
        items: data.items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      },
      {
        onError: (err) => {
          if (err.response.data.content instanceof Array) {
            const issues = err.response.data.content;
            issues.forEach((issue) => {
              form.setError(issue.path[0], {
                message: issue.message,
              });
            });
          }
        },
      }
    );
  };

  const changeQuantity = useCallback(
    debounce((id: number, quantity: number) => {
      form.setValue(
        "items",
        form.getValues("items")!.map((item) => {
          if (item.product.id === id) {
            return {
              ...item,
              quantity,
            };
          }

          return item;
        })
      );
    }),
    []
  );

  const columns: ColumnDef<IItem>[] = [
    {
      header: "Name",
      cell: ({ row }) => `${row.original.product.name.slice(0, 15)}...`,
    },
    {
      header: "Quantity",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Input
            onChange={(e) =>
              changeQuantity(row.original.product.id, Number(e.target.value))
            }
            type="number"
            defaultValue={row.original.quantity}
            min="1"
          />
          <Button
            onClick={() => {
              form.setValue(
                "items",
                form
                  .getValues("items")!
                  .filter((item) => item.product.id !== row.original.product.id)
              );
            }}
            variant="outline"
          >
            <PiTrashSimpleBold />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <FormComponent {...form}>
        <form
          className="flex flex-col lg:flex-row lg:items-start gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <UserComboBox
            users={users}
            form={form}
            setUsersSearch={setUsersSearch}
          />

          <ProductCombobox
            products={products}
            form={form}
            setProductsSearch={setProductsSearch}
          />
        </form>
      </FormComponent>

      <Separator />

      <DataTable<IItem>
        columns={columns}
        data={form.watch("items") ?? []}
        pageCount={Math.ceil(form.watch("items")?.length ?? 0 / 8)}
      />

      {isLoading ? (
        <LoadingButton className="w-fit">Placing your order</LoadingButton>
      ) : (
        <Button onClick={form.handleSubmit(onSubmit)} className="w-fit">
          Place order
        </Button>
      )}
    </div>
  );
}
