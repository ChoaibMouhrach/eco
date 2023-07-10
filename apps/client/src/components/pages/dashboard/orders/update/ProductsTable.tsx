import { ColumnDef, PaginationState } from "@tanstack/react-table";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import DataTable from "@/components/custom/data/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IOrderUpdate } from "@/interfaces/Order";
import { IProduct } from "@/interfaces/Product";

type TProductItem = IProduct & { orderQuantity: number };

interface ProductsTableProps {
  items: TProductItem[];
  form: UseFormReturn<IOrderUpdate, any>;
}

export function ProductsTable({ items, form }: ProductsTableProps) {
  const handleIncreaseOrderQuantity = (id: number) => {
    form.setValue(
      "products",
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            orderQuantity: item.orderQuantity + 1,
          };
        }

        return item;
      })
    );
  };

  const handleDecreaseOrderQuantity = (id: number) => {
    form.setValue(
      "products",
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            orderQuantity: item.orderQuantity + 1,
          };
        }

        return item;
      })
    );
  };

  const handleSetOrderQuantity = (id: number, quantity: number) => {
    form.setValue(
      "products",
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            orderQuantity: quantity,
          };
        }
        return item;
      })
    );
  };

  const columns: ColumnDef<TProductItem>[] = [
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
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <DataTable<TProductItem>
      pageCount={Math.ceil(items.length / pagination.pageSize)}
      columns={columns}
      data={items}
      pagination={pagination}
      setPagination={setPagination}
      onDelete={handleDelete}
    />
  );
}
