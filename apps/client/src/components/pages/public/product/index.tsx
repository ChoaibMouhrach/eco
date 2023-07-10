import { IProduct } from "@/interfaces/Product";
import { ProductImages } from "./ProductImages";
import { ProductInfo } from "./ProductInfo";

interface ProductPageProps {
  product: IProduct;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="gap-8 flex flex-col lg:grid lg:grid-cols-2">
      <ProductImages name={product.name} images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
}
