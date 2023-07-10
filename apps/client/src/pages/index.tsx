import { GetServerSideProps } from "next";
import Head from "next/head";
import { PublicLayout } from "@/components/layouts";
import { withUser } from "@/middlewares";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import Home from "@/components/pages/public/home";
import { IProduct } from "@/interfaces/Product";
import api from "@/api";

interface HomeProps {
  user?: IUser;
  products: IProduct[];
}

export default function Index({ user, products }: HomeProps) {
  return (
    <>
      <Head>Home</Head>
      <PublicLayout user={user}>
        <Home products={products} />
      </PublicLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withUser(
  async (ctx: AuthGetServerSidePropsContext) => {
    const { data: products } = await api(
      {
        url: "/products",
      },
      ctx
    );

    return {
      props: {
        products: products.data,
        user: ctx.auth ?? null,
      },
    };
  }
);
