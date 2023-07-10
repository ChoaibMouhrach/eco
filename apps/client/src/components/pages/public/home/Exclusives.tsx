import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/Product";

interface ExclusivesProps {
  products: IProduct[];
}

export function Exclusives({ products }: ExclusivesProps) {
  return (
    <div className="container mx-auto grid gap-4 lg:grid-cols-4 grid-rows-2">
      <div className="border shadow-lg border-gray-100 rounded-md grid lg:h-[400px] lg:grid-cols-2 p-4 lg:col-start-1 lg:col-end-4 row-start-1 row-end-3 gap-4">
        <div className="flex items-center justify-center">
          <Image
            className="object-contain rounded-md"
            src={`${process.env.API_STORAGE_URL}/${products[0].images[0].path}`}
            width="300"
            height="300"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <Link
              href={`/products/${products[0].id}`}
              className="text-2xl font-semibold tracking-wide hover:underline"
            >
              {products[0].name}
            </Link>
            <p className="text-neutral-500 text-sm">
              {products[0].description.slice(0, 150)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-700 text-xl">$ {products[0].price}</span>
            <span className="text-neutral-500 line-through">$ 1800</span>
          </div>
          <Button className="w-fit">
            <Link href={`/products/${products[0].id}`}>Shop</Link>
          </Button>
        </div>
      </div>
      <Link
        href={`/products/${products[1].id}`}
        className="bg-gray-50 rounded-md p-8 grid grid-cols-2"
      >
        <div className="flex flex-col gap-4 justify-center">
          <span className="font-semibold tracking-wide">
            {products[1].name}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-red-700 text-lg font-semibold">
              $ {products[1].price}
            </span>
            <span className="text-neutral-500 line-through">$ 1800</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Image
            className="object-contain"
            src={`${process.env.API_STORAGE_URL}/${products[1].images[0].path}`}
            width="100"
            height="100"
            alt=""
          />
        </div>
      </Link>
      <div className="bg-gray-50 rounded-md p-4 grid grid-cols-2">
        <div className="flex flex-col gap-4 justify-center">
          <span className="font-semibold tracking-wide">
            {products[2].name}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-red-700 text-lg font-semibold">
              $ {products[2].price}
            </span>
            <span className="text-neutral-500 line-through">$ 1800</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Image
            className="object-contain"
            src={`${process.env.API_STORAGE_URL}/${products[2].images[0].path}`}
            width="100"
            height="100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
