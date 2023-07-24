import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { PiTrashSimpleBold } from "react-icons/pi";
import DataTable from "@/components/custom/data/table";
import LoadingButton from "@/components/ui/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateOrder } from "@/hooks";
import { IPaginate } from "@/interfaces/Common";
import { IOrder, IOrderState } from "@/interfaces/Order";
import { IProduct } from "@/interfaces/Product";
import { IUser } from "@/interfaces/User";
import debounce from "@/lib/debounce";
import { handleError } from "@/lib/httpMutationHelper";
import { schema } from "./schema";
import { IOrderUpdate, IItem } from "./interface";
import { UsersCombobox } from "./fields/UsersCombobox";
import { ProductsCombobox } from "./fields/ProductsCombobox";
import { StateCombobox } from "./fields/StateCombovox";

interface UpdateFormProps {
  order: IOrder;
  products: IPaginate<IProduct>;
  users: IPaginate<IUser>;
  states: IOrderState[];
  setUsersSearch: React.Dispatch<React.SetStateAction<string>>;
  setProductsSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function UpdateForm({
  order,
  products,
  users,
  setUsersSearch,
  setProductsSearch,
  states,
}: UpdateFormProps) {
  const { toast } = useToast();

  const [stateChanged, setStateChanged] = useState(false);
  const [userChanged, setUserChanged] = useState(false);
  const [productsChanged, setProductsChanged] = useState(false);

  const form = useForm<IOrderUpdate>({
    resolver: zodResolver(schema),
    defaultValues: {
      items: order.items,
      userId: order.user.id,
      stateId: order.orderState.id,
    },
  });

  const { mutate: updateOrder, isLoading } = useUpdateOrder();

  const onSubmit = (data: IOrderUpdate) => {
    if (!userChanged && !stateChanged && !productsChanged) {
      toast(handleError("Change something first"));
      return;
    }

    updateOrder({
      id: order.id,
      data: {
        ...data,
        items: data.items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      },
    });
  };

  const changeQuantity = useCallback(
    debounce((id: number, quantity: number) => {
      setProductsChanged(true);
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
              setProductsChanged(true);
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
      <Form {...form}>
        <form
          className="flex flex-col lg:flex-row lg:items-start gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <UsersCombobox
            setUsersSearch={setUsersSearch}
            setUserChanged={setUserChanged}
            form={form}
            users={users}
            order={order}
          />

          <ProductsCombobox
            setProductsChanged={setProductsChanged}
            setProductsSearch={setProductsSearch}
            form={form}
            products={products}
          />

          <StateCombobox
            setStateChanged={setStateChanged}
            form={form}
            states={states}
            order={order}
          />
        </form>
      </Form>

      <Separator />

      <DataTable<IItem>
        columns={columns}
        data={form.watch("items") ?? []}
        pageCount={Math.ceil(form.watch("items")?.length ?? 0 / 8)}
      />

      {isLoading ? (
        <LoadingButton className="w-fit">Updating order</LoadingButton>
      ) : (
        <Button onClick={form.handleSubmit(onSubmit)} className="w-fit">
          Update order
        </Button>
      )}
    </div>
  );
}
