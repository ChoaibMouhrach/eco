import { GetServerSidePropsContext } from "next";
import EditCategoryPage from "@/Components/Pages/dashboard/categories/edit/[id]";
import { Category, User } from "@/index";
import api from "@/lib/api";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
  category: Category;
}

export default function Edit({ user, category }: EditProps) {
  return <EditCategoryPage user={user} category={category} />;
}

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const id = ctx.params?.id;

    if (!id || typeof id !== "string" || !/^\d+$/gi.test(id)) {
      return {
        redirect: {
          destination: "/dashboard/categories",
          permanent: true,
        },
      };
    }

    try {
      const response = await api({
        url: `/categories/${id}`,
      });

      return {
        props: {
          category: response.data,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/dashboard/categories",
          permanent: true,
        },
      };
    }
  }
);
