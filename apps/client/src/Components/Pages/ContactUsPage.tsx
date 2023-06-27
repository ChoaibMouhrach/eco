import { User } from "@/index";
import PublicLayout from "../Layouts/PublicLayout";

interface ContactUsProps {
  user?: User;
}

export default function ContactUsPage({ user }: ContactUsProps) {
  return <PublicLayout user={user}>Contact Us</PublicLayout>;
}
