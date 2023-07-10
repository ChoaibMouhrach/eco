import { GetServerSideProps } from "next";
import Head from "next/head";
import api from "@/api";
import { DashboardLayout } from "@/components/layouts";
import { IProduct } from "@/interfaces/Product";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardCreateOrderPage from "@/components/pages/dashboard/orders/create";

interface CreateProps {
  user: IUser;
  users: IUser[];
  products: IProduct[];
}

export default function Create({ user: auth, users, products }: CreateProps) {
  return (
    <>
      <Head>
        <title>Create order</title>
      </Head>
      <DashboardLayout
        user={auth}
        title="Create Order"
        description="You can create new orders from here."
      >
        <DashboardCreateOrderPage
          defaultUsers={users}
          defaultProducts={products}
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const products = await api(
      {
        url: "/products",
      },
      ctx
    );

    const users = await api(
      {
        url: "/users",
      },
      ctx
    );

    return {
      props: {
        products: products.data.data,
        users: users.data.data,
        user: ctx.auth!,
      },
    };
  }
);
