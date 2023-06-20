import CreateCategoryPage from "@/Components/Pages/dashboard/categories/create";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <CreateCategoryPage user={user} />;
}

export const getServerSideProps = withAuth();
