import { DashboardLayout } from "@/components/layouts";
import { AuthGetServerSidePropsContext, IUser } from "@/interfaces/User";
import { withAuth } from "@/middlewares";
import api from "@/api";
import { ICategory } from "@/interfaces/Category";
import CreateProduct from "@/components/custom/Products/Create";
import { IUnit } from "@/interfaces/Unit";

interface CreateProps {
  user: IUser;
  units: IUnit[];
  categories: ICategory[];
}

export default function Create({ user, units, categories }: CreateProps) {
  console.log({ units, categories });
  return (
    <DashboardLayout
      user={user}
      title="Create Product"
      description="You can create new products from here."
    >
      <CreateProduct units={units} categories={categories} />
    </DashboardLayout>
  );
}

export const getServerSideProps = withAuth(
  async (ctx: AuthGetServerSidePropsContext) => {
    const categories = await api({
      url: "/categories",
    });

    const units = await api({
      url: "/units",
    });

    return {
      props: {
        units: units.data.data,
        categories: categories.data.data,
        user: ctx.auth,
      },
    };
  }
);
