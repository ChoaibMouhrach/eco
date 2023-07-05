import { GetServerSideProps } from "next";
import api from "@/api";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import { DashboardLayout } from "@/components/layouts";
import DashboardUpdateUserPage from "@/components/pages/dashboard/users/update";

interface UpdateProps {
  user: IUser;
  slug: IUser;
}

export default function Update({ user, slug }: UpdateProps) {
  return (
    <DashboardLayout
      user={user}
      title="Create User"
      description="You can create new users from here."
    >
      <DashboardUpdateUserPage slug={slug} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const id = ctx.params?.id;

    try {
      const response = await api(
        {
          url: `/users/${id}`,
        },
        ctx
      );

      return {
        props: {
          slug: response.data,
          user: ctx.auth,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/404",
          permanent: true,
        },
      };
    }
  }
);
