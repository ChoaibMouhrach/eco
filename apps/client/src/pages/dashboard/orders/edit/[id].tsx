import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import UpdateOrderPage from "@/components/pages/dashboard/orders/update";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface EditProps {
  user: IUser;
}

export default function Edit({ user }: EditProps) {
  return (
    <>
      <Head>
        <title>Update Order</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Update Order"
        description="You can update existing orders from here."
      >
        <UpdateOrderPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth({ role: "admin" });
