import UpdateInfo from "@/components/Profile/UpdateUserInfo";
import UpdatePassword from "@/components/Profile/UpdatePassword";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { setUser } from "@/features/slices/userSlice";
import { redirect } from "@/helpers/routingHelpers";
import { getCurrentUser } from "@/lib/api/getAuthUser";
import { User } from "@/types/Auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useDispatch } from "react-redux";

export default function Profile({ user }: { user: User }) {
  /* Set The user in the store */
  useDispatch()(setUser(user));

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <UpdateInfo user={user} />
        <UpdatePassword />
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const accessToken = ctx.req.cookies?.accessToken;

  if (!accessToken) {
    return redirect("/sign-in");
  }

  const user = await getCurrentUser(ctx);

  if (user === null) {
    return redirect("/sign-in");
  }

  return {
    props: {
      user,
    },
  };
};
