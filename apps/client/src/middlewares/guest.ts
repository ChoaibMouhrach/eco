import { redirect } from "@/helpers/routingHelpers";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const guest: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  if (Object.keys(ctx.req.cookies).length) {
    return redirect("/dashboard/profile");
  }

  return {
    props: {},
  };
};
