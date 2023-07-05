import { DashboardLayout } from "@/components/layouts";
import DashboardProductsPage from "@/components/pages/dashboard/products/index";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface ProductsProps {
  user: IUser;
}

export default function Products({ user }: ProductsProps) {
  return (
    <DashboardLayout
      user={user}
      title="Products"
      description="You can manage your products from here."
    >
      <DashboardProductsPage />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth();
