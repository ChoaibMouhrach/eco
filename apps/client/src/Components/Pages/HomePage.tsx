import PublicLayout from "../Layouts/PublicLayout";
import { User } from "@/index";

interface HomePageProps {
  user?: User;
}

export default function HomePage({ user }: HomePageProps) {
  return (
    <PublicLayout>{user ? "Authenticated" : "UnAuthenticated"}</PublicLayout>
  );
}
