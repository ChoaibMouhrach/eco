import EditUserPage from "@/Components/Pages/dashboard/users/edit/[id]";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
}

export default function Edit({ user }: EditProps) {
  return <EditUserPage user={user} />;
}

export const getServerSideProps = withAuth();
