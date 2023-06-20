import EditOrderPage from "@/Components/Pages/dashboard/orders/edit/[id]";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
}

export default function Edit({ user }: EditProps) {
  return <EditOrderPage user={user} />;
}

export const getServerSideProps = withAuth();
