import { GetServerSideProps } from "next";
import Head from "next/head";
import { withGuest } from "@/middlewares";
import SignUpPage from "@/components/pages/auth/sign-up";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignUpPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withGuest();
