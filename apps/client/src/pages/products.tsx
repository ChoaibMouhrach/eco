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
    const params: Record<string, string> = {};

    if (ctx.query.search) {
      params.search =
        ctx.query.search instanceof Array
          ? ctx.query.search[0]
          : ctx.query.search ?? "";
    }

    if (ctx.query.page) {
      const page =
        ctx.query.page instanceof Array
          ? ctx.query.page[0]
          : ctx.query.page ?? "";

      if (page && /^\d+$/gi.test(page)) {
        params.page = page;
      }
    }

    if (ctx.query.price) {
      const price =
        ctx.query.price instanceof Array
          ? ctx.query.price[0]
          : ctx.query.price ?? "";

      if (price && /^\d+-\d+$/gi.test(price)) {
        params.price = price;
      }
    }

    const { data: products } = await api(
      {
        url: `/products?${new URLSearchParams(params).toString()}`,
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
