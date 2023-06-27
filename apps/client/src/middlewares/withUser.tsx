import { GetServerSideProps, GetServerSidePropsContext } from "next";
import api from "@/lib/api";

const withUser = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (ctx: GetServerSidePropsContext) => {
    const { accessToken, refreshToken } = ctx.req.cookies;

    if (!accessToken || !refreshToken) {
      return {
        props: {},
      };
    }

    try {
      const response = await api(
        {
          url: "/me",
          method: "GET",
        },
        ctx
      );

      if (getServerSideProps) {
        const getServerSidePropsResult = await getServerSideProps(ctx);

        if ("props" in getServerSidePropsResult) {
          return {
            props: {
              user: response.data,
              ...getServerSidePropsResult.props,
            },
          };
        }

        return getServerSidePropsResult;
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

export default withUser;
