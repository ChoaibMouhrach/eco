import Image from "next/image";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IProduct } from "@/interfaces/Product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks";

export function ProductCard({ product }: { product: IProduct }) {
  const { add } = useCart();

  return (
    <div className="flex flex-col">
      <div className="relative h-52 p-4 border border-gray-300 flex items-center justify-center bg-gray-50 rounded-md">
        <Image
          className="object-contain"
          src={`${process.env.API_STORAGE_URL}/${product.images[0].path}`}
          width="128"
          height="128"
          alt={product.name}
        />
        <Button
          onClick={() => add({ product, quantity: 1 })}
          className="absolute top-0 right-0 m-4"
        >
          <MdOutlineShoppingCart />
        </Button>
      </div>
      <div className="flex flex-col justify-between gap-2 px-2 py-4 text-sm">
        <Link href={`/products/${product.id}`} className="font-semibold">
          {product.name.slice(0, 30)}
        </Link>
        <span className="font-semibold">$ {product.price}.00</span>
        <p className="text-sm tracking-wide text-neutral-600">
          {product.description.slice(0, 100)}
        </p>
      </div>
    </div>
  );
}
