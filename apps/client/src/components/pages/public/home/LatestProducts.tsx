import { ProductCard } from "@/components/custom";
import { IProduct } from "@/interfaces/Product";

interface LatestProductsProps {
  products: IProduct[];
}

export function LatestProducts({ products }: LatestProductsProps) {
  return (
    <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
