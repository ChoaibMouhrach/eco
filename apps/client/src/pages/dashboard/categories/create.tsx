import { GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardCreateCategoryPage from "@/components/pages/dashboard/categories/create";

interface CreateProps {
  user: IUser;
}

export default function Create({ user }: CreateProps) {
  return (
    <DashboardLayout
      user={user}
      title="Create Category"
      description="You can create new categories from here."
    >
      <DashboardCreateCategoryPage />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
