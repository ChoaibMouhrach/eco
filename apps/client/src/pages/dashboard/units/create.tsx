import { DashboardLayout } from "@/components/layouts";
import DashboardCreateUnitPage from "@/components/pages/dashboard/units/create";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface CreateUnitProps {
  user: IUser;
}

export default function CreateUnit({ user }: CreateUnitProps) {
  return (
    <DashboardLayout
      user={user}
      title="Create unit"
      description="You can create new units from here."
    >
      <DashboardCreateUnitPage />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
