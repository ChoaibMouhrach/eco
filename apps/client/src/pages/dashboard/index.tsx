import DashboardPage from "@/Components/Pages/dashboard";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  return <DashboardPage user={user} />;
}

export const getServerSideProps = withAuth();
