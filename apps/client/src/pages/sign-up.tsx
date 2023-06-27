import SignUpPage from "@/Components/Pages/SignUpPage";
import withGuest from "@/middlewares/withGuest";

export default function SignUp() {
  return <SignUpPage />;
}

export const getServerSideProps = withGuest();
