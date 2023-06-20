import ProductsPage from "@/Components/Pages/dashboard/products";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface ProductsProps {
  user: User;
}

export default function Products({ user }: ProductsProps) {
  return <ProductsPage user={user} />;
}

export const getServerSideProps = withAuth();
