import { GetServerSideProps } from "next";
import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { withAuth } from "@/middlewares";
import { IUser } from "@/interfaces/User";
import CreateOrdersPage from "@/components/pages/dashboard/orders/create";

interface CreateProps {
  user: IUser;
}

export default function Create({ user: auth }: CreateProps) {
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
        <CreateOrdersPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth({
  role: "admin",
});
