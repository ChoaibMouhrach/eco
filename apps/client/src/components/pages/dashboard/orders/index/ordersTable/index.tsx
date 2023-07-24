import { PaginationState } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import DataTable from "@/components/custom/data/table";
import { IPaginate } from "@/interfaces/Common";
import { IOrder } from "@/interfaces/Order";
import debounce from "@/lib/debounce";
import { columns } from "./columns";
import { DeleteOrderDialog } from "./DeleteOrderDialog";

interface IQuery {
  search: string;
  page: number;
}

interface OrdersTableProps {
  orders?: IPaginate<IOrder>;
  refetch: () => any;

  query: IQuery;
  setQuery: React.Dispatch<React.SetStateAction<IQuery>>;
}

export function OrdersTable({
  query,
  refetch,
  setQuery,
  orders,
}: OrdersTableProps) {
  const router = useRouter();
  const [deleteOrder, setDeleteOrder] = useState<IOrder | null>(null);

  const onSearchChange = useCallback(
    debounce((value: string) => {
      setQuery({
        ...query,
        search: value,
      });
    }),
    []
  );

  const onPaginationChange = (pagination: PaginationState) => {
    setQuery({
      ...query,
      page: pagination.pageIndex + 1,
    });
  };

  return (
    <>
      <DataTable<IOrder>
        // data
        columns={columns}
        data={orders?.data ?? []}
        pageCount={orders ? Math.ceil(orders.count / orders.limit) : 1}
        // events
        onSearchChange={onSearchChange}
        onPaginationChange={onPaginationChange}
        // actions
        actions={{
          Update: (order: IOrder) => {
            router.push(`/dashboard/orders/edit/${order.id}`);
          },
          Delete: (order: IOrder) => {
            setDeleteOrder(order);
          },
        }}
      />

      {/* Dialogs */}
      {deleteOrder && (
        <DeleteOrderDialog
          refetch={refetch}
          order={deleteOrder}
          setOrder={setDeleteOrder}
        />
      )}
    </>
  );
}
