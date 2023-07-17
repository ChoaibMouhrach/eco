import { ColumnDef, PaginationState } from "@tanstack/react-table";
import Image from "next/image";
import { BiDotsVertical } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/router";
import DataTable from "@/components/custom/data/table";
import { IProduct } from "@/interfaces/Product";
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
import { useDeleteProduct, useUpdateProduct } from "@/hooks";
import LoadingButton from "@/components/ui/LoadingButton";

interface ActionsProps {
  refetchProducts: () => any;
  product: IProduct;
}

function Actions({ refetchProducts, product }: ActionsProps) {
  const router = useRouter();

  // state
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [exclusiveAlertOpen, setExclusiveAlertOpen] = useState(false);

  const { mutate: deleteProduct, isLoading: isDeletingProductLoading } =
    useDeleteProduct();

  const { mutate: makeExclusive, isLoading: isMakingProductExclusiveLoading } =
    useUpdateProduct();

  const handleExclusive = () =>
    makeExclusive(
      {
        id: product.id,
        data: {
          isExclusive: !product.isExclusive,
        },
      },
      {
        onSuccess: () => refetchProducts(),
        onSettled: () => setExclusiveAlertOpen(false),
      }
    );

  const handleDelete = () =>
    deleteProduct(product.id, { onSuccess: () => refetchProducts() });

  const handleEdit = () => {
    router.push(`/dashboard/products/edit/${product.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="px-2">
            <BiDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setExclusiveAlertOpen(true)}>
            Toggle exclusive
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/products/${product.id}`)}
          >
            View as client
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDeleteAlertOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Exclusive */}
      <AlertDialog open={exclusiveAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently make this
              product {product.isExclusive ? "non exclusive" : "exclusive"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setExclusiveAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              {isMakingProductExclusiveLoading ? (
                <LoadingButton>Making the product exclusive</LoadingButton>
              ) : (
                <Button onClick={handleExclusive}>
                  Make product{" "}
                  {product.isExclusive ? "non exclusive" : "exclusive"}
                </Button>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* delete product */}
      <AlertDialog open={deleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              {isDeletingProductLoading ? (
                <LoadingButton>Deleting product</LoadingButton>
              ) : (
                <Button onClick={handleDelete}>Delete Product</Button>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface ProductsTableProps {
  handlePagination: (pagination: PaginationState) => any;
  handleSearch: (value: string) => any;
  products: IProduct[];
  pageCount: number;
  refetchProducts: () => any;
}

export function ProductsTable({
  handlePagination,
  refetchProducts,
  products,
  handleSearch,
  pageCount,
}: ProductsTableProps) {
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
      header: "Exclusive",
      cell: ({ row }) => (row.original.isExclusive ? "True" : "False"),
    },
    {
      header: "Actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row }) => (
        <Actions refetchProducts={refetchProducts} product={row.original} />
      ),
    },
  ];

  return (
    <DataTable<IProduct>
      // data
      columns={columns}
      data={products}
      pageCount={pageCount}
      // events
      onSearchChange={handleSearch}
      onPaginationChange={handlePagination}
    />
  );
}
