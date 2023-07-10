import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import DashboardCategoriesPage from "@/components/pages/dashboard/categories/index";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface CategoriesProps {
  user: IUser;
}

export default function Categories({ user }: CategoriesProps) {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Categories"
        description="You can manage your categories from here"
      >
        <DashboardCategoriesPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth();
