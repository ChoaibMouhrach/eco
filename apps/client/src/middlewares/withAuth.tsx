import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AxiosError } from "axios";
import { User } from "..";
import api from "@/lib/api";

interface AuthGetServerSidePropsContext extends GetServerSidePropsContext {
  user?: User;
}

const withAuth = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (ctx: AuthGetServerSidePropsContext) => {
    const { accessToken, refreshToken } = ctx.req.cookies;

    if (!accessToken || !refreshToken) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
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

      const getServerSIdePropsResult = getServerSideProps
        ? await getServerSideProps(ctx)
        : undefined;

      if (!getServerSIdePropsResult) {
        return {
          props: {
            user: response.data,
          },
        };
      }

      if ("props" in getServerSIdePropsResult) {
        return {
          props: {
            user: response.data,
            ...getServerSIdePropsResult.props,
          },
        };
      }

      return getServerSIdePropsResult;
    } catch (err) {
      if (err instanceof AxiosError && err.config?.url?.includes("/refersh")) {
        ctx.res.setHeader("set-cookie", [
          "refreshToken=;Max-Age=0, path=/",
          "accessToken=;Max-Age=0, path=/",
        ]);
      }

      return {
        redirect: {
          destination: "/sign-in",
          permanent: true,
        },
      };
    }
  };
};

export default withAuth;
