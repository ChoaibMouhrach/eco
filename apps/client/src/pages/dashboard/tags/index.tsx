import TagsPage from "@/Components/Pages/dashboard/tags";
import { User } from "@/index";
import withAuth from "@/middlewares/withAuth";

interface TagsProps {
  user: User;
}

export default function Tags({ user }: TagsProps) {
  return <TagsPage user={user} />;
}

export const getServerSideProps = withAuth();
