import UsersPage from "@/Components/Pages/dashboard/users";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface UsersProps {
  user: User;
}

export default function Users({ user }: UsersProps) {
  return <UsersPage user={user} />;
}

export const getServerSideProps = withAuth();
