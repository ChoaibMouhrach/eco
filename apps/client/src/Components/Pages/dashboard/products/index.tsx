import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Product } from "@/index";

interface ProductsPageProps {
  user: Product;
}

export default function ProductsPage({ user }: ProductsPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
