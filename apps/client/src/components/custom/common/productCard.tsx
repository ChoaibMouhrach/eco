import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/interfaces/Product";

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col">
      <div className="h-52 p-4 border border-gray-300 flex items-center justify-center bg-gray-50 rounded-md">
        <Image
          className="object-contain"
          src={`${process.env.API_STORAGE_URL}/${product.images[0].path}`}
          width="128"
          height="128"
          alt={product.name}
        />
      </div>
      <div className="flex flex-col justify-between gap-2 px-2 py-4">
        <Link href={`/products/${product.id}`}>{product.name}</Link>
        <p className="text-sm tracking-wide text-neutral-600">
          {product.description.slice(0, 100)}
        </p>
        <span>$ {product.price}.00</span>
      </div>
    </div>
  );
}
