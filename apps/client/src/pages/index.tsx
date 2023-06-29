import { GetServerSideProps } from "next";
import Hero from "@/components/custom/Home/Hero";
import Features from "@/components/custom/Home/Features";
import Exclusives from "@/components/custom/Home/Exclusives";
import Brands from "@/components/custom/Home/Brands";
import LatestProducts from "@/components/custom/Home/LatestProducts";
import { PublicLayout } from "@/components/layouts";
import { withUser } from "@/middlewares";
import { IUser } from "@/interfaces/User";

interface HomeProps {
  user?: IUser;
}

export default function Home({ user }: HomeProps) {
  return (
    <PublicLayout user={user}>
      <Hero />
      <Features />
      <Exclusives />
      <Brands />
      <LatestProducts />
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withUser();
