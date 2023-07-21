import Head from "next/head";
import { PublicLayout } from "@/components/layouts";
import CheckOutPage from "@/components/pages/public/CheckOut/index";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface CheckOutProps {
  user: IUser;
}

export default function CheckOut({ user }: CheckOutProps) {
  return (
    <PublicLayout user={user}>
      <Head>
        <title>Checkout</title>
      </Head>
      <CheckOutPage />
    </PublicLayout>
  );
}

export const getServerSideProps = withAuth();
