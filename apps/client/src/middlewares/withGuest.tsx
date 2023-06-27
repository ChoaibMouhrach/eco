import { GetServerSideProps, GetServerSidePropsContext } from "next";

const withGuest = (): GetServerSideProps => {
  return async (ctx: GetServerSidePropsContext) => {
    const { accessToken, refreshToken } = ctx.req.cookies;

    if (accessToken || refreshToken) {
      return {
        redirect: {
          destination: "/dashboard/profile",
          permanent: true,
        },
      };
    }

    return {
      props: {},
    };
  };
};

export default withGuest;
