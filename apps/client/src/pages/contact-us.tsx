import ContactUsPage from "@/Components/Pages/ContactUsPage";
import { User } from "..";
import withUser from "@/middlewares/withUser";

interface ContactUsProps {
  user?: User;
}

export default function ContactUs({ user }: ContactUsProps) {
  return <ContactUsPage user={user} />;
}

export const getServerSideProps = withUser();
