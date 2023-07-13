import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import DashboardUsersPage from "@/components/pages/dashboard/users/index";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";

interface UsersProps {
  auth: IUser;
  users: IPaginate<IUser>;
}

export default function Index({ auth, users }: UsersProps) {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <DashboardLayout
        user={auth}
        title="Users"
        description="You can manage your users from here."
      >
        <DashboardUsersPage defaultUsers={users} />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const { auth } = ctx;

    const response = await api(
      {
        url: "/users",
      },
      ctx
    );

    return {
      props: {
        users: response.data,
        auth,
      },
    };
  }
);
