import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/Product";
import { Quantity } from "./Quantity";

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [item, setItem] = useState({
    product,
    quantity: 1,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {product.tags.map((tag) => (
          <Link
            className="text-xs py-2 px-4 rounded-md bg-gray-100"
            key={tag.id}
            href={`/products?search=${tag.name}`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="py-2 text-4xl font-bold tracking-wide">
          {product.name}
        </h1>
        <div className="border-y border-gray-300 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl">$ {product.price}</div>{" "}
            <div className="bg-gray-50 py-2 px-4 rounded-md text-sm">
              Per {product.unit.name}
            </div>
          </div>
          <Quantity item={item} setItem={setItem} />
          <Button className="w-fit">
            <div className="flex items-center gap-2">
              <MdOutlineShoppingCart />
              Add to cart
            </div>
          </Button>
        </div>
        <p className="text-neutral-600">{product.description}</p>
      </div>
    </div>
  );
}
