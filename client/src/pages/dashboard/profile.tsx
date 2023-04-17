import Button from "@/components/Button";
import Card from "@/components/Card";
import CardBody from "@/components/Card/CardBody";
import CardFooter from "@/components/Card/CardFooter";
import CardHeader from "@/components/Card/CardHeader";
import Input from "@/components/Form/Input";
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
      <Card>
        <CardHeader>
          <h1 className="text-2xl tracking-wide font-bold">Profile</h1>
          <p className="text-neutral-500">Update You Profile information</p>
        </CardHeader>
        <form>
          <CardBody>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row gap-3">
                <Input defaultValue={user.firstName} placeholder="First Name..." name="firstName" id="firstName" type="text" />
                <Input defaultValue={user.firstName} placeholder="Last Name..." name="lastName" id="lastName" type="text" />
              </div>
              <Input defaultValue={user.email} placeholder="Email Address..." name="email" id="email" type="email" />
              <Input placeholder="Password..." name="password" id="password" type="password" />
              <Input placeholder="Password Confirmation..." name="password_confirmation" id="password" type="password" />
            </div>
          </CardBody>
          <CardFooter>
            <Button>Update</Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
