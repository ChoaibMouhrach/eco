import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditUserPageProps {
  user: User;
}

export default function EditUserPage({ user }: EditUserPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
