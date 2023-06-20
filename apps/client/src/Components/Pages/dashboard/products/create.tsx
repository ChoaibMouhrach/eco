import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Product } from "@/index";

interface CreateProductPageProps {
  user: Product;
}

export default function CreateProductPage({ user }: CreateProductPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
