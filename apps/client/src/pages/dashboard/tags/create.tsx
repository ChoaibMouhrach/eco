import CreateTagPage from "@/Components/Pages/dashboard/tags/create";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <CreateTagPage user={user} />;
}

export const getServerSideProps = withAuth();
