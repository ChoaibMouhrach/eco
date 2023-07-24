import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { IUser } from "@/interfaces/User";

export const columns: ColumnDef<IUser>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    cell: ({ row }) => (
      <span>
        {row.original.firstName} {row.original.lastName}
      </span>
    ),
  },
  {
    header: "Email Address",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => <span>{row.original.role?.name}</span>,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];
