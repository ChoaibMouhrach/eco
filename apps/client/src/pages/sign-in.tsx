import { GetServerSideProps } from "next";
import { withGuest } from "@/middlewares";
import SignInPage from "@/components/pages/auth/sign-in";

export default function SignIn() {
  return <SignInPage />;
}

export const getServerSideProps: GetServerSideProps = withGuest();
