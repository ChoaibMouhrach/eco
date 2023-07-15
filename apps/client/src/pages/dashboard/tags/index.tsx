import Head from "next/head";
import { DashboardLayout } from "@/components/layouts";
import { withAuth } from "@/middlewares";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import DashboardTagsPage from "@/components/pages/dashboard/tags/index";
import api from "@/api";
import { IPaginate } from "@/interfaces/Common";
import { ITag } from "@/interfaces/Tag";

interface TagsProps {
  auth: IUser;
  tags: IPaginate<ITag>;
}

export default function Tags({ auth, tags }: TagsProps) {
  return (
    <>
      <Head>
        <title>Tags</title>
      </Head>
      <DashboardLayout
        user={auth}
        title="Tags"
        description="You can manage your tags from here."
      >
        <DashboardTagsPage defaultTags={tags} />
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const tags = await api(
      {
        url: "/tags",
      },
      ctx
    );

    return {
      props: {
        tags: tags.data,
        auth: ctx.auth,
      },
    };
  }
);
