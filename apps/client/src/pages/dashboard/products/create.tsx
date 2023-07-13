import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import api from "@/api";
import { ICategory } from "@/interfaces/Category";
import { IUnit } from "@/interfaces/Unit";
import DashboardCreateProduct from "@/components/pages/dashboard/products/create";

interface CreateProps {
  user: IUser;
  units: IUnit[];
  categories: ICategory[];
}

export default function Create({ user, units, categories }: CreateProps) {
  return (
    <>
      <Head>
        <title>Create Product</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Create Product"
        description="You can create new products from here."
      >
        <DashboardCreateProduct units={units} categories={categories} />
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

    const units = await api(
      {
        url: "/units",
      },
      ctx
    );

    return {
      props: {
        units: units.data.data,
        categories: categories.data.data,
        user: ctx.auth,
      },
    };
  }
);
