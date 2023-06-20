import OrdersPage from "@/Components/Pages/dashboard/orders";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface OrdersProps {
  user: User;
}

export default function Orders({ user }: OrdersProps) {
  return <OrdersPage user={user} />;
}

export const getServerSideProps = withAuth();
