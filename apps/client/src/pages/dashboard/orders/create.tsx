import CreateOrderPage from "@/Components/Pages/dashboard/orders/create";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <CreateOrderPage user={user} />;
}

export const getServerSideProps = withAuth();
