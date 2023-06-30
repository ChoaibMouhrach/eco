import { GetServerSideProps } from "next";
import api from "@/api";
import { AuthGetServerSidePropsContext } from "@/interfaces/User";

export const withAuth = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (ctx: AuthGetServerSidePropsContext) => {
    try {
      const response = await api(
        {
          url: "/me",
        },
        ctx
      );

      ctx.auth = response.data;

      if (getServerSideProps) {
        return await getServerSideProps(ctx);
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
