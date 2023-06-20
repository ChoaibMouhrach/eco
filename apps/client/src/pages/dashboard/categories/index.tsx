import CategoriesPage from "@/Components/Pages/dashboard/categories";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CategoriesProps {
  user: User;
}

export default function Categories({ user }: CategoriesProps) {
  return <CategoriesPage user={user} />;
}

export const getServerSideProps = withAuth();
