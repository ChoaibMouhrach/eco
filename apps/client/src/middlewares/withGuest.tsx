import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const withGuest = (
  getServerSideProps?: GetServerSideProps
): GetServerSideProps => {
  return async (ctx: GetServerSidePropsContext) => {
    if (ctx.req.cookies.accessToken) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }

    if (getServerSideProps) return await getServerSideProps(ctx);

    return {
      props: {},
    };
  };
};
