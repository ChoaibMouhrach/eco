import { IProduct } from "@/interfaces/Product";
import { Brands } from "./Brands";
import { Exclusives } from "./Exclusives";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { LatestProducts } from "./LatestProducts";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Hero />
      <Features />
      <Exclusives products={products} />
      <Brands />
      <LatestProducts products={products} />
    </>
  );
}
