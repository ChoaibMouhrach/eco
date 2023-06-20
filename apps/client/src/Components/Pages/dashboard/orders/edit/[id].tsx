import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditOrderPageProps {
  user: User;
}

export default function EditOrderPage({ user }: EditOrderPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
