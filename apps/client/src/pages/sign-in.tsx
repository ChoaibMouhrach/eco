import { GetServerSideProps } from "next";
import Head from "next/head";
import { withGuest } from "@/middlewares";
import SignInPage from "@/components/pages/auth/sign-in";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignInPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withGuest();
