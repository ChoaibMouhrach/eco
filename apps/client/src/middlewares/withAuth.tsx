import { GetServerSideProps } from "next";
import api from "@/api";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";

interface WithAuthProps {
  getServerSideProps?: GetServerSideProps;
  role?: "admin" | "member";
}

export const withAuth = (params?: WithAuthProps): GetServerSideProps => {
  return async (ctx: AuthGetServerSidePropsContext) => {
    try {
      const response = await api(
        {
          url: "/me",
        },
        ctx
      );

      const user = response.data as IUser;

      if (params?.role && user.role.name !== params.role) {
        return {
          redirect: {
            destination: "/403",
            permanent: false,
          },
        };
      }

      ctx.auth = response.data;

      if (params?.getServerSideProps) {
        return await params.getServerSideProps(ctx);
      }

      return {
        props: {
          user: response.data,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: true,
        },
      };
    }
  };
};
