import ProfilePage from "@/Components/Pages/ProfilePage";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface ProfileProps {
  user?: User;
}

export default function Profile({ user }: ProfileProps) {
  return <ProfilePage user={user} />;
}

export const getServerSideProps = withAuth();
