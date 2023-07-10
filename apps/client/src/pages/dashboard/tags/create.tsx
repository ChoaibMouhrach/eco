import { GetServerSideProps } from "next";
import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardCreateTagPage from "@/components/pages/dashboard/tags/create";

interface TagsProps {
  user: IUser;
}

export default function Tags({ user }: TagsProps) {
  return (
    <>
      <Head>
        <title>Create Tag</title>
      </Head>
      <DashboardLayout
        user={user}
        title="Create Tag"
        description="You can create new tags from here."
      >
        <DashboardCreateTagPage />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
