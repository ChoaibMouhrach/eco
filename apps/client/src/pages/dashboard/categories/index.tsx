import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import DashboardCategoriesPage from "@/components/pages/dashboard/categories/index";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import api from "@/api";
import { ICategory } from "@/interfaces/Category";
import { IPaginate } from "@/interfaces/Common";

interface CategoriesProps {
  user: IUser;
  categories: IPaginate<ICategory>;
}

export default function Categories({ user, categories }: CategoriesProps) {
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
        <DashboardCategoriesPage defaultCategories={categories} />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const categories = await api(
      {
        url: "/categories",
      },
      ctx
    );

    return {
      props: {
        categories: categories.data,
        auth: ctx.auth,
      },
    };
  }
);
