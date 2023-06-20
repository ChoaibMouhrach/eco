import SignInpage from "@/Components/Pages/SignInPage";
import withGuest from "@/middlewares/withGuest";

export default function SignIn() {
  return <SignInpage />;
}

export const getServerSideProps = withGuest();
