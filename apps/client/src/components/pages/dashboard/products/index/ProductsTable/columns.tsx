import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { IProduct } from "@/interfaces/Product";

export const columns: ColumnDef<IProduct>[] = [
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
];
