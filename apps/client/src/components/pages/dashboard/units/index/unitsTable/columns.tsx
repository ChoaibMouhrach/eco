import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { IUnit } from "@/interfaces/Unit";

export const columns: ColumnDef<IUnit>[] = [
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
