import { GetServerSideProps, GetServerSidePropsContext } from "next";
import api from "@/lib/api";

export default function Auth() {
  return <div>AUTH</div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const token = ctx.params?.token;

  if (typeof token !== "string") {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: true,
      },
    };
  }

  try {
    const response = await api({
      url: `/auth/${token}`,
      method: "POST",
    });

    ctx.res.setHeader("set-cookie", response.headers["set-cookie"] ?? []);

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
};
