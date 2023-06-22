import { GetServerSidePropsContext } from "next";
import EditUserPage from "@/Components/Pages/dashboard/users/edit/[id]";
import { Unit, User } from "@/index";
import api from "@/lib/api";
import withAuth from "@/middlewares/withAuth";

interface EditProps {
  user: User;
  unit: Unit;
}

export default function Edit({ user, unit }: EditProps) {
  return <EditUserPage unit={unit} user={user} />;
}

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const id = ctx.params?.id;

    if (!id || typeof id !== "string" || !/^\d+$/gi.test(id)) {
      return {
        redirect: {
          destination: "/dashboard/units",
          permanent: true,
        },
      };
    }

    try {
      const response = await api({
        url: `/units/${id}`,
      });

      return {
        props: {
          unit: response.data,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: "/dashboard/units",
          permanent: true,
        },
      };
    }
  }
);
