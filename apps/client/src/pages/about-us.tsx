import Head from "next/head";
import { PublicLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import AboutUsPage from "@/components/pages/public/AboutUs";
import { withUser } from "@/middlewares";

interface AboutUsProps {
  user: IUser;
}

export default function AboutUs({ user }: AboutUsProps) {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <PublicLayout user={user}>
        <AboutUsPage />
      </PublicLayout>
    </>
  );
}

export const getServerSideProps = withUser();
