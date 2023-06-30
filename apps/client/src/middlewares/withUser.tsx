import { GetServerSideProps } from "next";
import api from "@/api";
import { AuthGetServerSidePropsContext } from "@/interfaces/User";

export const withUser = (
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

      if (getServerSideProps) {
        ctx.auth = response.data;
        return await getServerSideProps(ctx);
      }

      return {
        props: {
          user: response.data,
        },
      };
    } catch (err) {
      return {
        props: {},
      };
    }
  };
};
