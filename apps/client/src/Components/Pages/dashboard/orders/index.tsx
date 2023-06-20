import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Order } from "@/index";

interface OrdersPageProps {
  user: Order;
}

export default function OrdersPage({ user }: OrdersPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
