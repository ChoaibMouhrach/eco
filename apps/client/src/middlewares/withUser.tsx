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

      ctx.auth = response.data;
    } catch (err) {
      // nothing
    }

    if (getServerSideProps) {
      return await getServerSideProps(ctx);
    }

    return {
      props: {
        user: ctx.auth ?? null,
      },
    };
  };
};
