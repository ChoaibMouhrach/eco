import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditTagPageProps {
  user: User;
}

export default function EditTagPage({ user }: EditTagPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
