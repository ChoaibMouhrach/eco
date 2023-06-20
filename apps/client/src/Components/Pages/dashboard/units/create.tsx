import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Unit } from "@/index";

interface CreateUnitPageProps {
  user: Unit;
}

export default function CreateUnitPage({ user }: CreateUnitPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
