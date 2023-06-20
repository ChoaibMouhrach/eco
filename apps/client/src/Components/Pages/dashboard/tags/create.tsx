import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Tag } from "@/index";

interface CreateTagPageProps {
  user: Tag;
}

export default function CreateTagPage({ user }: CreateTagPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
