import { IProduct } from "@/interfaces/Product";
import { Brands } from "./Brands";
import { Exclusives } from "./Exclusives";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { LatestProducts } from "./LatestProducts";

interface HomeProps {
  products: IProduct[];
  exclusiveProducts: IProduct[];
}

export default function Home({ products, exclusiveProducts }: HomeProps) {
  return (
    <>
      <Hero />
      <Features />
      <Exclusives products={exclusiveProducts} />
      <Brands />
      <LatestProducts products={products} />
    </>
  );
}
