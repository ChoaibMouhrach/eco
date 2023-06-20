import CreatePurchasePage from "@/Components/Pages/dashboard/purchases/create";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface CreateProps {
  user: User;
}

export default function Create({ user }: CreateProps) {
  return <CreatePurchasePage user={user} />;
}

export const getServerSideProps = withAuth();
