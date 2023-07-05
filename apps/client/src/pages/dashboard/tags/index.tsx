import { DashboardLayout } from "@/components/layouts";
import { withAuth } from "@/middlewares";
import { IUser } from "@/interfaces/User";
import DashboardTagsPage from "@/components/pages/dashboard/tags/index";

interface TagsProps {
  user: IUser;
}

export default function Tags({ user }: TagsProps) {
  return (
    <DashboardLayout
      user={user}
      title="Tags"
      description="You can manage your tags from here."
    >
      <DashboardTagsPage />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
