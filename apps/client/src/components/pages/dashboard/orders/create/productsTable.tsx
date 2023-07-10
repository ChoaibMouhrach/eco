import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import DataTable from "@/components/custom/data/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IOrderCreate } from "@/interfaces/Order";
import { IProduct } from "@/interfaces/Product";
import debounce from "@/lib/debounce";

type ProductOrder = IProduct & { orderQuantity: number };

interface ProductsTableProps {
  products: ProductOrder[];
  form: UseFormReturn<IOrderCreate>;
}

export function ProductsTable({ products, form }: ProductsTableProps) {
  const handleIncreaseOrderQuantity = (id: number) => {
    form.setValue(
      "products",
      form.getValues("products").map((product: ProductOrder) => {
        if (product.id === id) {
          return {
            ...product,
            orderQuantity: product.orderQuantity + 1,
          };
        }
        return product;
      })
    );
  };

  const handleDecreaseOrderQuantity = (id: number) => {
    form.setValue(
      "products",
      form.getValues("products").map((product: ProductOrder) => {
        if (product.id === id) {
          return {
            ...product,
            orderQuantity: product.orderQuantity - 1,
          };
        }
        return product;
      })
    );
  };

  const handleSetOrderQuantity = debounce((id: number, quantity: number) => {
    form.setValue(
      "products",
      form.getValues("products").map((product: ProductOrder) => {
        if (product.id === id) {
          return {
            ...product,
            orderQuantity: quantity,
          };
        }
        return product;
      })
    );
  });

  const columns: ColumnDef<ProductOrder>[] = [
    {
      header: "#",
      accessorKey: "id",
    },
    {
      header: "Name",
      cell: ({ row }) => `${row.original.name.slice(0, 15)}...`,
    },
    {
      header: "Order quantity",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            disabled={row.original.orderQuantity === 1}
            onClick={() => handleDecreaseOrderQuantity(row.original.id)}
          >
            <MdOutlineRemove />
          </Button>
          <Input
            type="number"
            min="1"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleSetOrderQuantity(row.original.id, Number(e.target.value));
            }}
            defaultValue={row.original.orderQuantity}
            className="w-16 text-center"
          />
          <Button onClick={() => handleIncreaseOrderQuantity(row.original.id)}>
            <MdOutlineAdd />
          </Button>
        </div>
      ),
    },
    {
      header: "Created At",
      cell: ({ row }) => moment(row.original.createdAt).fromNow(),
    },
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const handleDelete = (id: number) => {
    form.setValue(
      "products",
      products.filter((product) => product.id !== id)
    );
  };

  return (
    <DataTable<ProductOrder>
      pageCount={Math.ceil(products.length / 8)}
      columns={columns}
      pagination={pagination}
      setPagination={setPagination}
      data={products}
      onDelete={handleDelete}
    />
  );
}
