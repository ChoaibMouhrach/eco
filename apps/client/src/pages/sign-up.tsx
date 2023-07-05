import { GetServerSideProps } from "next";
import { withGuest } from "@/middlewares";
import SignUpPage from "@/components/pages/auth/sign-up";

export default function SignUp() {
  return <SignUpPage />;
}

export const getServerSideProps: GetServerSideProps = withGuest();
