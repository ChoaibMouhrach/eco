import EditCategoryPage from "@/Components/Pages/dashboard/categories/edit/[id]";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
}

export default function Edit({ user }: EditProps) {
  return <EditCategoryPage user={user} />;
}

export const getServerSideProps = withAuth();
