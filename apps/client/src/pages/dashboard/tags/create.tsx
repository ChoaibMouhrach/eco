import { GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardTagsPage from "@/components/pages/dashboard/tags/index";

interface TagsProps {
  user: IUser;
}

export default function Tags({ user }: TagsProps) {
  return (
    <DashboardLayout
      user={user}
      title="Create Tag"
      description="You can create new tags from here."
    >
      <DashboardTagsPage />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
