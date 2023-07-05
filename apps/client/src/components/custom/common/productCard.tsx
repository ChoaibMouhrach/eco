import Image from "next/image";
import { IProduct } from "@/interfaces/Product";

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="flex bg-gray-50 p-2 flex-col gap-4">
      <div>
        <Image src={product.images} width="300" height="300" alt="" />
      </div>
      <div>
        <span className="bg-gray-100 rounde-md p-2 rounded-md text-sm">
          {product.category}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-sm tracking-wide">{product.name}</span>
        <span className="text-sm">$ {product.price}</span>
      </div>
    </div>
  );
}
