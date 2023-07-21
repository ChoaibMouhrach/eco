import { useRouter } from "next/router";
import { PublicLayout } from "@/components/layouts";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import CheckOutStatePage from "@/components/pages/public/CheckOut/State";

interface StateProps {
  auth: IUser;
}

export default function State({ auth }: StateProps) {
  const router = useRouter();
  return (
    <PublicLayout user={auth}>
      <CheckOutStatePage success={router.query.success === "1"} />
    </PublicLayout>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    if (!ctx.query.success) {
      return {
        redirect: {
          destination: "/checkout",
          permanent: true,
        },
      };
    }

    return {
      props: {
        auth: ctx.auth,
      },
    };
  }
);
