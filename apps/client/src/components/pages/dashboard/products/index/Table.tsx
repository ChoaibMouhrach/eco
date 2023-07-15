import { ColumnDef, PaginationState } from "@tanstack/react-table";
import Image from "next/image";
import { MutateOptions } from "@tanstack/react-query";
import { BiDotsVertical } from "react-icons/bi";
import { useState } from "react";
import DataTable from "@/components/custom/data/table";
import { IProduct } from "@/interfaces/Product";
import { IPaginate } from "@/interfaces/Common";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks";

interface ProductsTableProps {
  products: IPaginate<IProduct>;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearchChange?: (value: string) => void;
}

function Actions({ onDelete, id }: ActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <BiDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await onDelete(id, {
                    onSettled: () => setOpen(false),
                  });
                } catch (err) {
                  // do nothing
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function ProductsTable({
  products,
  onSearchChange,
  onPaginationChange,
}: ProductsTableProps) {
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const onDelete = (id: number, options?: MutateOptions<any, any, any>) => {
    deleteProduct(id, options);
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      header: "#",
      accessorKey: "id",
    },
    {
      header: "Image",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row }) => (
        <Image
          src={`${process.env.API_STORAGE_URL}/${row.original.images[0].path}`}
          alt="product"
          className="w-16 h-16 object-contain"
          width="720"
          height="720"
        />
      ),
    },
    {
      header: "Name",
      cell: ({ row }) => `${row.original.name.slice(0, 20)}...`,
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row }) => <Actions onDelete={onDelete} id={row.original.id} />,
    },
  ];

  return (
    <DataTable<IProduct>
      // data
      columns={columns}
      data={products.data}
      pageCount={Math.ceil(products.count / products.limit)}
      // events
      onSearchChange={onSearchChange}
      onPaginationChange={onPaginationChange}
    />
  );
}

interface ActionsProps {
  onDelete: (id: number, options?: MutateOptions<any, any, any>) => any;
  id: number;
}
