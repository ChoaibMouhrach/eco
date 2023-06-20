import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Unit } from "@/index";

interface UnitsPageProps {
  user: Unit;
}

export default function UnitsPage({ user }: UnitsPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
