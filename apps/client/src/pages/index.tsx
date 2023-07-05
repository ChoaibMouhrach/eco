import { GetServerSideProps } from "next";
import { PublicLayout } from "@/components/layouts";
import { withUser } from "@/middlewares";
import { IUser } from "@/interfaces/User";
import Home from "@/components/pages/public/home";

interface HomeProps {
  user?: IUser;
}

export default function Index({ user }: HomeProps) {
  return (
    <PublicLayout user={user}>
      <Home />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withUser();
