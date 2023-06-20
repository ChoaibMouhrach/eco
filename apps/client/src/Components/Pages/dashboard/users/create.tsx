import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface CreateUserPageProps {
  user: User;
}

export default function CreateUserPage({ user }: CreateUserPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
