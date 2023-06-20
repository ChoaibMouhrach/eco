import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditProductPageProps {
  user: User;
}

export default function EditProductPage({ user }: EditProductPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
