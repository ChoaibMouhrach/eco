import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditUnitPageProps {
  user: User;
}

export default function EditUnitPage({ user }: EditUnitPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
