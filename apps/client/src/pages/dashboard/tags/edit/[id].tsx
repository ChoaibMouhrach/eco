import EditTagPage from "@/Components/Pages/dashboard/tags/edit/[id]";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
}

export default function Edit({ user }: EditProps) {
  return <EditTagPage user={user} />;
}

export const getServerSIdeProps = withAuth();
