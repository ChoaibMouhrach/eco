import ProductsPage from "@/Components/Pages/dashboard/products";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <ProductsPage user={user} />;
}

export const getServerSideProps = withAuth();
