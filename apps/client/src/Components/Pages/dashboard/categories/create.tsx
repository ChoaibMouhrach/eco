import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Category } from "@/index";

interface CreateCategoryPageProps {
  user: Category;
}

export default function CreateCategoryPage({ user }: CreateCategoryPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
