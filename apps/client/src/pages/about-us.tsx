import AboutUsPage from "@/Components/Pages/AboutUsPage";
import { User } from "..";
import withUser from "@/middlewares/withUser";

interface AboutUsProps {
  user?: User;
}

export default function AboutUs({ user }: AboutUsProps) {
  return <AboutUsPage user={user} />;
}

export const getServerSideProps = withUser();
