import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardUnitsPage from "@/components/pages/dashboard/units/index";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { IUnit } from "@/interfaces/Unit";

interface UnitsProps {
  auth: IUser;
  units: IPaginate<IUnit>;
}

export default function Units({ auth, units }: UnitsProps) {
  return (
    <>
      <Head>
        <title>Units</title>
      </Head>
      <DashboardLayout
        user={auth}
        title="Units"
        description="You can manage your units from here"
      >
        <DashboardUnitsPage defaultUnits={units} />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const response = await api(
      {
        url: "/units",
      },
      ctx
    );

    return {
      props: {
        units: response.data,
        auth: ctx.auth,
      },
    };
  }
);
