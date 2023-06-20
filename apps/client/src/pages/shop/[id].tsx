import ShopProductPage from "@/Components/Pages/ShopPage/ShopProductPage";
import { User } from "@/index";
import withUser from "@/middlewares/withUser";

interface ShopProductProps {
  user?: User;
}

export default function ShopProduct({ user }: ShopProductProps) {
  return <ShopProductPage user={user} />;
}

export const getServerSideProps = withUser();
