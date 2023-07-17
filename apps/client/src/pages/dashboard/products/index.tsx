import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import DashboardProductsPage from "@/components/pages/dashboard/products/index";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";

interface ProductsProps {
  user: IUser;
  products: IPaginate<IProduct>;
}

export default function Products({ user }: ProductsProps) {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Products"
        description="You can manage your products from here."
      >
        <DashboardProductsPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth();
