import { GetServerSideProps } from "next";
import Head from "next/head";
import api from "@/api";
import { DashboardLayout } from "@/components/layouts";
import { ICategory } from "@/interfaces/Category";
import { IProduct } from "@/interfaces/Product";
import { IUnit } from "@/interfaces/Unit";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardUpdateProduct from "@/components/pages/dashboard/products/update";

interface UpdateProps {
  user: IUser;
  units: IUnit[];
  categories: ICategory[];
  product: IProduct;
}

export default function Update({
  product,
  units,
  categories,
  user,
}: UpdateProps) {
  return (
    <>
      <Head>
        <title>Update Product</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Update Product"
        description="You can update your product from here."
      >
        <DashboardUpdateProduct
          product={product}
          units={units}
          categories={categories}
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const id = ctx.params?.id;

    try {
      const product = await api(
        {
          url: `/products/${id}`,
        },
        ctx
      );

      let categories: any = api({
        url: `/categories`,
      });

      let units: any = api({
        url: "/units",
      });

      const promises = await Promise.all([categories, units]);

      [categories, units] = promises;

      return {
        props: {
          units: units.data.data,
          categories: categories.data.data,
          product: product.data,
          user: ctx.auth,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/404",
          permanent: true,
        },
      };
    }
  }
);
