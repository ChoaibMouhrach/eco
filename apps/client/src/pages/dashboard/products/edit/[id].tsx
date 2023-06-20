import EditProductPage from "@/Components/Pages/dashboard/products/edit/[id]";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
}

export default function Edit({ user }: EditProps) {
  return <EditProductPage user={user} />;
}

export const getServerSideProps = withAuth();
