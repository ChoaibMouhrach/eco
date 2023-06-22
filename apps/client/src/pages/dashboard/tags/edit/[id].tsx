import { GetServerSidePropsContext } from "next";
import EditTagPage from "@/Components/Pages/dashboard/tags/edit/[id]";
import { Tag, User } from "@/index";
import api from "@/lib/api";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
  tag: Tag;
}

export default function Edit({ user, tag }: EditProps) {
  return <EditTagPage user={user} tag={tag} />;
}

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const id = ctx.params?.id;

    if (!id || typeof id !== "string" || !/^\d+$/gi.test(id)) {
      return {
        redirect: {
          destination: "/dashboard/tags",
          permanent: true,
        },
      };
    }

    try {
      const response = await api({
        url: `/tags/${id}`,
      });

      return {
        props: {
          tag: response.data,
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
