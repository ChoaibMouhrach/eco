import { GetServerSideProps } from "next";
import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardCreateUserPage from "@/components/pages/dashboard/users/create";

interface CreateProps {
  user: IUser;
}

export default function Create({ user }: CreateProps) {
  return (
    <>
      <Head>
        <title>Create User</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Create User"
        description="You can create new users from here."
      >
        <DashboardCreateUserPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth({
  role: "admin",
});
