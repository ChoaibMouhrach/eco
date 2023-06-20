import ShopPage from "@/Components/Pages/ShopPage";
import { User } from "../..";
import withUser from "@/middlewares/withUser";

interface ShopProps {
  user?: User;
}

export default function Shop({ user }: ShopProps) {
  return <ShopPage user={user} />;
}

export const getServerSideProps = withUser();
