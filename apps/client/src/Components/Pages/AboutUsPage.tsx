import { User } from "@/index";
import PublicLayout from "../Layouts/PublicLayout";
import withUser from "@/middlewares/withUser";

interface AboutPageProps {
  user?: User;
}

export default function AboutUsPage({ user }: AboutPageProps) {
  return <PublicLayout user={user}>About</PublicLayout>;
}

export const getServerSideProps = withUser();
