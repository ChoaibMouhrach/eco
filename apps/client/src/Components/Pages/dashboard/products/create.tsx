import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface CreateProductPageProps {
  user: User;
}

export default function CreateProductPage({ user }: CreateProductPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
