import CreateUnitPage from "@/Components/Pages/dashboard/units/create";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <CreateUnitPage user={user} />;
}

export const getServerSIdeProps = withAuth();
