import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditCategoryPageProps {
  user: User;
}

export default function EditCategoryPage({ user }: EditCategoryPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
