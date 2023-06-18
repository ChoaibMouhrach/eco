import { User } from "@/index";

interface ProfilePageProps {
  user?: User;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  return <div>{user?.firstName}</div>;
}
