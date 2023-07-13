import Head from "next/head";
import api from "@/api";
import { Breadcrumbs } from "@/components/custom";
import { PublicLayout } from "@/components/layouts";
import ProductPage from "@/components/pages/public/product";
import { IProduct } from "@/interfaces/Product";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withUser } from "@/middlewares";

interface ProductsProps {
  user: IUser;
  product: IProduct;
}

export default function Products({ user, product }: ProductsProps) {
  return (
    <PublicLayout user={user}>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className="flex flex-col gap-8 pt-8 container">
        <Breadcrumbs
          items={[
            {
              name: "Products",
              href: "/products",
            },
            {
              name: product.category.name,
              href: `/products?search=${product.category.name}`,
            },
            {
              name: product.name,
              href: `/products/${product.id}`,
            },
          ]}
        />
        <ProductPage product={product} />
      </div>
    </PublicLayout>
  );
}

export const getServerSideProps = withUser(
  async (ctx: AuthGetServerSidePropsContext) => {
    const id = ctx.params?.id;

    try {
      const { data: product } = await api(
        {
          url: `/products/${id}`,
        },
        ctx
      );

      return {
        props: {
          product,
          user: ctx.auth ?? null,
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
