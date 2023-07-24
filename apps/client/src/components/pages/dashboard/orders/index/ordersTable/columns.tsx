import { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import moment from "moment";
import { IItem, IOrder } from "@/interfaces/Order";

const orderState = cva(
  ["text-white", "p-2", "rounded-md", "w-fit", "text-sm"],
  {
    variants: {
      state: {
        Pending: ["bg-gray-600"],
        Progress: ["bg-blue-600"],
        Completed: ["bg-green-600"],
      },
    },
  }
);

export const columns: ColumnDef<IOrder>[] = [
  {
    header: "#",
    accessorKey: "id",
    cell: ({ row }) => <span className="text-gray-600">{row.original.id}</span>,
  },
  {
    header: "User",
    cell: ({ row }) => (
      <span className="word-nowrap">
        {row.original.user.firstName} {row.original.user.lastName}
      </span>
    ),
  },
  {
    header: "Products",
    cell: ({ row }) => <span>{row.original.items.length}</span>,
  },
  {
    header: "Total Quantity",
    cell: ({ row }) => (
      <span>
        {
          row.original.items.reduce((acc, cur) => {
            return {
              quantity: acc.quantity + cur.quantity,
            } as IItem;
          }).quantity
        }
      </span>
    ),
  },
  {
    header: "Total Profit",
    cell: ({ row }) => (
      <span>
        ${" "}
        {row.original.items
          .map((item) => item.quantity * item.price)
          .reduce((acc, cur) => acc + cur)
          .toFixed(2)}
      </span>
    ),
  },
  {
    header: "Payment",
    cell: ({ row }) => (
      <div>
        <div
          className={`${
            row.original.ready ? "bg-green-600" : "bg-orange-600"
          } text-white p-2 rounded-md w-fit text-sm`}
        >
          {row.original.ready ? "Success" : "Waiting"}
        </div>
      </div>
    ),
  },
  {
    header: "State",
    cell: ({ row }) => (
      <div>
        <div
          className={`${orderState({
            state: row.original.orderState.name,
          })} text-white p-2 rounded-md w-fit text-sm`}
        >
          {row.original.orderState.name}
        </div>
      </div>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => moment(row.original.createdAt).fromNow(),
  },
];
