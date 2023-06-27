import CreateUserPage from "@/Components/Pages/dashboard/users/create";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <CreateUserPage user={user} />;
}

export const getServerSideProps = withAuth();
