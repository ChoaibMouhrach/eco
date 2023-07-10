import Head from "next/head";
import { PublicLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withUser } from "@/middlewares";
import ContactUsPage from "@/components/pages/public/contactUs";

interface ContactUsProps {
  user: IUser;
}
export default function ContactUs({ user }: ContactUsProps) {
  return (
    <>
      <Head>Contact Us</Head>
      <PublicLayout user={user}>
        <ContactUsPage />
      </PublicLayout>
    </>
  );
}

export const getServerSideProps = withUser();
