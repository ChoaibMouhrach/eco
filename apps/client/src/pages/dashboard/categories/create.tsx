import { GetServerSideProps } from "next";
import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardCreateCategoryPage from "@/components/pages/dashboard/categories/create";

interface CreateProps {
  user: IUser;
}

export default function Create({ user }: CreateProps) {
  return (
    <>
      <Head>
        <title>Create Categories</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Create Category"
        description="You can create new categories from here."
      >
        <DashboardCreateCategoryPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth({
  role: "admin",
});
