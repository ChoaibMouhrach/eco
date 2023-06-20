import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Order } from "@/index";

interface CreateOrderPageProps {
  user: Order;
}

export default function CreateOrderPage({ user }: CreateOrderPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
