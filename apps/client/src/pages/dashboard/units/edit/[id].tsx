import api from "@/api";
import { DashboardLayout } from "@/components/layouts";
import DashboardUpdateUnitPage from "@/components/pages/dashboard/units/update";
import { IUnit } from "@/interfaces/Unit";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";

interface EditProps {
  user: IUser;
  unit: IUnit;
}

export default function Edit({ user, unit }: EditProps) {
  return (
    <DashboardLayout
      user={user}
      title="Edit Unit"
      description="You can edit your units from here."
    >
      <DashboardUpdateUnitPage unit={unit} />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    try {
      const { id } = ctx.query;

      const response = await api(
        {
          url: `/units/${id}`,
        },
        ctx
      );

      return {
        props: {
          unit: response.data,
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
