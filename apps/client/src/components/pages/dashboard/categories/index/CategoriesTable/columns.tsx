import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { ICategory } from "@/interfaces/Category";

export const columns: ColumnDef<ICategory>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    // x minutes ago
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];
