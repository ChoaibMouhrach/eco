import UnitsPage from "@/Components/Pages/dashboard/units";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface UnitsProps {
  user: User;
}

export default function Units({ user }: UnitsProps) {
  return <UnitsPage user={user} />;
}

export const getServerSideProps = withAuth();
