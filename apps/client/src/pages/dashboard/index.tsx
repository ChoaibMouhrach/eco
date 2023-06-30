import { GetServerSideProps } from "next";
import { withAuth } from "@/middlewares";

export default function Dashboard() {
  return <div>Dashboard</div>;
}

export const getServerSideProps: GetServerSideProps = withAuth();
