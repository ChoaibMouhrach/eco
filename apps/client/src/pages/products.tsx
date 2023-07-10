import Head from "next/head";
import api from "@/api";
import { Breadcrumbs } from "@/components/custom";
import { PublicLayout } from "@/components/layouts";
import ProductsPage from "@/components/pages/public/products";
import { IPaginate } from "@/interfaces/Common";
import { IProduct } from "@/interfaces/Product";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withUser } from "@/middlewares";

interface ProductsProps {
  user: IUser;
  products: IPaginate<IProduct>;
}

export default function Products({ user, products }: ProductsProps) {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <PublicLayout user={user}>
        <div className="container flex flex-col gap-8 pt-8 container">
          <Breadcrumbs
            items={[
              {
                name: "Products",
                href: "/products",
              },
            ]}
          />

          <ProductsPage products={products} />
        </div>
      </PublicLayout>
    </>
  );
}

export const getServerSideProps = withUser(
  async (ctx: AuthGetServerSidePropsContext) => {
    const { data: products } = await api(
      {
        url: "/products",
      },
      ctx
    );

    return {
      props: {
        products,
        user: ctx.auth,
      },
    };
  }
);
