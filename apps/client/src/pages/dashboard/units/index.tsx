import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardUnitsPage from "@/components/pages/dashboard/units/index";

interface UnitsProps {
  user: IUser;
}

export default function Units({ user }: UnitsProps) {
  return (
    <>
      <Head>
        <title>Units</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Units"
        description="You can manage your units from here"
      >
        <DashboardUnitsPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth();
