import { GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/layouts";
import { withAuth } from "@/middlewares";
import { IUser } from "@/interfaces/User";
import DashboardOrdersPage from "@/components/pages/dashboard/orders/index";

interface OrdersProps {
  user: IUser;
}

export default function Orders({ user }: OrdersProps) {
  return (
    <DashboardLayout
      user={user}
      title="Orders"
      description="You can manage your orders from here."
    >
      <DashboardOrdersPage />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
