import { DashboardLayout } from "@/components/layouts";
import DashboardUsersPage from "@/components/pages/dashboard/users/index";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface UsersProps {
  user: IUser;
}

export default function Index({ user }: UsersProps) {
  return (
    <DashboardLayout user={user} title="" description="">
      <DashboardUsersPage />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
