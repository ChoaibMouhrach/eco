import { GetServerSideProps } from "next";
import api from "@/api";
import { DashboardLayout } from "@/components/layouts";
import { ICategory } from "@/interfaces/Category";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import DashboardUpdateCategoryPage from "@/components/pages/dashboard/categories/update";

interface EditProps {
  user: IUser;
  category: ICategory;
}

export default function Edit({ user, category }: EditProps) {
  return (
    <DashboardLayout
      user={user}
      title="Update category"
      description="You can manage your categories from here."
    >
      <DashboardUpdateCategoryPage category={category} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const id = ctx.params?.id;

    try {
      const response = await api({
        url: `/categories/${id}`,
      });

      return {
        props: {
          category: response.data,
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
