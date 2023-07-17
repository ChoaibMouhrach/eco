import { GetServerSideProps } from "next";
import Head from "next/head";
import { PublicLayout } from "@/components/layouts";
import { withUser } from "@/middlewares";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import Home from "@/components/pages/public/home";
import { IProduct } from "@/interfaces/Product";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";

interface HomeProps {
  user?: IUser;
  products: IPaginate<IProduct>;
  exclusiveProducts: IPaginate<IProduct>;
}

export default function Index({
  user,
  products,
  exclusiveProducts,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Eco</title>
      </Head>
      <PublicLayout user={user}>
        <Home
          products={products.data}
          exclusiveProducts={exclusiveProducts.data}
        />
      </PublicLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withUser(
  async (ctx: AuthGetServerSidePropsContext) => {
    const products = await api(
      {
        url: "/products",
      },
      ctx
    );

    const exclusiveProducts = await api(
      {
        url: "/products?isExclusive=true",
      },
      ctx
    );

    return {
      props: {
        products: products.data,
        exclusiveProducts: exclusiveProducts.data,
        user: ctx.auth ?? null,
      },
    };
  }
);
