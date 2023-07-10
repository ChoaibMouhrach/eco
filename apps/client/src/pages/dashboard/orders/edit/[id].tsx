import { AxiosResponse } from "axios";
import Head from "next/head";
import api from "@/api";
import { DashboardLayout } from "@/components/layouts";
import UpdateOrderPage from "@/components/pages/dashboard/orders/update";
import { IPaginate } from "@/interfaces/Common";
import { IOrder } from "@/interfaces/Order";
import { IProduct } from "@/interfaces/Product";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface EditProps {
  user: IUser;
  products: IProduct[];
  users: IUser[];
  order: IOrder;
}

export default function Edit({ user, order, products, users }: EditProps) {
  return (
    <>
      <Head>
        <title>Update Order</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Update Order"
        description="You can update existing orders from here."
      >
        <UpdateOrderPage
          defaultProducts={products}
          defaultUsers={users}
          order={order}
        />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const id = ctx.params?.id;

    try {
      const response = await api(
        {
          url: `/orders/${id}`,
        },
        ctx
      );

      let products:
        | Promise<AxiosResponse<IPaginate<IProduct>>>
        | AxiosResponse<IPaginate<IProduct>> = api(
        {
          url: "/products",
        },
        ctx
      );

      let users:
        | Promise<AxiosResponse<IPaginate<IUser>>>
        | AxiosResponse<IPaginate<IUser>> = api(
        {
          url: "/users",
        },
        ctx
      );

      [products, users] = await Promise.all([products, users]);

      return {
        props: {
          products: products.data.data,
          users: users.data.data,
          order: response.data,
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
