import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { Tag } from "@/index";

interface TagsPageProps {
  user: Tag;
}

export default function TagsPage({ user }: TagsPageProps) {
  return <DashboardLayout user={user}>Dashboard</DashboardLayout>;
}
