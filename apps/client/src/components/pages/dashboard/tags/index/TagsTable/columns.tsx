import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { ITag } from "@/interfaces/Tag";

export const columns: ColumnDef<ITag>[] = [
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
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];
