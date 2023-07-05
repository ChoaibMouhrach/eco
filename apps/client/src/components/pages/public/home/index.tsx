import { Brands } from "./Brands";
import { Exclusives } from "./Exclusives";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { LatestProducts } from "./LatestProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Exclusives />
      <Brands />
      <LatestProducts />
    </>
  );
}
