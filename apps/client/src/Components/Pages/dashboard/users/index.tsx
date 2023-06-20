import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface UsersPageProps {
  user: User;
}

export default function UsersPage({ user }: UsersPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
