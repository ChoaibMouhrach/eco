import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Purchase } from "@/index";

interface CreatePurchasePageProps {
  user: Purchase;
}

export default function CreatePurchasePage({ user }: CreatePurchasePageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
