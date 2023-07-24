import { useState } from "react";
import { useGetOrders } from "@/hooks";
import { OrdersTable } from "./ordersTable";

export default function DashboardOrdersPage() {
  const [query, setQuery] = useState({
    search: "",
    page: 1,
  });

  const { data: orders, refetch } = useGetOrders({ search: query.search });

  return (
    <OrdersTable
      refetch={refetch}
      orders={orders?.data}
      query={query}
      setQuery={setQuery}
    />
  );
}
