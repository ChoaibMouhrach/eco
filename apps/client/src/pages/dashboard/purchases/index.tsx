import PurchasesPage from "@/Components/Pages/dashboard/purchases";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface PurchasesProps {
  user: User;
}

export default function Purchases({ user }: PurchasesProps) {
  return <PurchasesPage user={user} />;
}

export const getServerSideProps = withAuth();
