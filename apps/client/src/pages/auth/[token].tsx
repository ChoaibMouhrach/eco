import { GetServerSideProps, GetServerSidePropsContext } from "next";
import api from "@/api";
import { withGuest } from "@/middlewares";

export default function Auth() {
  return <div />;
}

export const getServerSideProps: GetServerSideProps = withGuest(
  async (ctx: GetServerSidePropsContext) => {
    const token = ctx.params?.token;

    try {
      await api(
        {
          url: `auth/${token}`,
          method: "POST",
        },
        ctx
      );

      return {
        redirect: {
          destination: "/",
          permanent: true,
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
  }
);
