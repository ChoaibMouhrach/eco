import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface DashboardLayoutProps {
  user: User;
}

export default function DashboardPage({ user }: DashboardLayoutProps) {
  return <DashboardLayout user={user}>World</DashboardLayout>;
}
