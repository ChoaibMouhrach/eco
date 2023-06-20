import EditPurchasePage from "@/Components/Pages/dashboard/purchases/edit/[id]";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
}

export default function Edit({ user }: EditProps) {
  return <EditPurchasePage user={user} />;
}

export const getServerSideProps = withAuth();
