import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import DashboardProductsPage from "@/components/pages/dashboard/products/index";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";

interface ProductsProps {
  auth: IUser;
  products: IPaginate<IProduct>;
}

export default function Products({ auth, products }: ProductsProps) {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <DashboardLayout
        user={auth}
        title="Products"
        description="You can manage your products from here."
      >
        <DashboardProductsPage defaultProducts={products} />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const products = await api(
      {
        url: "/products",
      },
      ctx
    );

    return {
      props: {
        auth: ctx.auth,
        products: products.data,
      },
    };
  }
);
