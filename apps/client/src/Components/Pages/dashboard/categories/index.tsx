import DashboardLayout from "@/Components/Layouts/DashboardLayout";

interface CategoriesPageProps {
  user: Category;
}

export default function CategoriesPage({ user }: CategoriesPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
