import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Purchase } from "@/index";

interface PurchasesPageProps {
  user: Purchase;
}

export default function PurchasesPage({ user }: PurchasesPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
