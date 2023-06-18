import { GetServerSideProps, GetServerSidePropsContext } from "next";
import HomePage from "@/Components/Pages/HomePage";
import { User } from "..";
// import api from "@/lib/api";
import newApi from "@/lib/apip";

interface HomeProps {
  user?: User;
}

export default function Home({ user }: HomeProps) {
  return <HomePage user={user} />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { accessToken, refreshToken } = ctx.req.cookies;

  if (!accessToken || !refreshToken) {
    return {
      props: {},
    };
  }

  try {
    const response = await newApi(
      {
        url: "/me",
        method: "GET",
      },
      ctx
    );

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
