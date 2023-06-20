import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { User } from "@/index";

interface EditPurchasePageProps {
  user: User;
}

export default function EditPurchasePage({ user }: EditPurchasePageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
