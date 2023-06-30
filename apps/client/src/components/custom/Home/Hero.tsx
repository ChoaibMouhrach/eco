import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const data = [
  {
    name: "Doors",
    href: "",
  },
  {
    name: "Bathroom",
    href: "",
  },
  {
    name: "Building Materials",
    href: "",
  },
  {
    name: "Tiles",
    href: "",
  },
];

export default function Hero() {
  return (
    <div className="container gap-2 lg:h-96 mx-auto grid lg:grid-cols-6">
      <div className="hidden lg:grid">
        <div className="h-16 bg-slate-900 text-white flex items-center p-4">
          <span>Categories</span>
        </div>
        <div className="grid h-[calc(384px_-_64px)] gap-2 bg-gray-50">
          {data.map(({ name, href }) => (
            <Link
              className="h-16 flex items-center p-4 hover:bg-gray-100"
              key={name}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:col-start-2 lg:col-end-7 grid lg:grid-cols-2 gap-2">
        <div className="bg-gray-50 p-4 lg:row-start-1 lg:row-end-3 grid lg:grid-cols-2">
          <div className="flex justify-center flex-col gap-4">
            <span className="font-semibold text-xl tracking-wide">
              Marine Plywood
            </span>
            <p className="text-sm text-neutral-600">
              Are you looking for a high-quality marine plywood? Look no further
              than Build4less. We carry a wide range of plywood, perfect for any
              project. Our marine ply is.
            </p>
            <Button className="w-fit">Shop Now</Button>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://cdn.shopify.com/s/files/1/0222/7290/1216/products/AC220BL_01G_1920x1080.jpg?v=1637580156"
              width="150"
              height="150"
              alt=""
            />
          </div>
        </div>
        <div className="bg-gray-50 p-4 grid grid-cols-2 ">
          <div className="flex flex-col gap-2 justify-center">
            <span className="font-semibold tracking-wide">
              Corrapol-BT Corrugated Bitumen Fixings 100 Pack - All Colours
            </span>
            <div className="flex items-center gap-4">
              <span className="text-red-600 font-semibold text-lg">$ 995</span>
              <span className="line-through text-neutral-600">$ 1000</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt=""
              height="100"
              width="100"
              src="https://cdn.shopify.com/s/files/1/0222/7290/1216/products/AC220BL_01G_1920x1080.jpg?v=1637580156"
            />
          </div>
        </div>
        <div className="bg-gray-50 p-4 grid grid-cols-2 ">
          <div className="flex flex-col gap-2 justify-center">
            <span className="font-semibold tracking-wide">
              Corrapol-BT Corrugated Bitumen Fixings 100 Pack - All Colours
            </span>
            <div className="flex items-center gap-4">
              <span className="text-red-600 font-semibold text-lg">$ 995</span>
              <span className="line-through text-neutral-600">$ 1000</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt=""
              height="100"
              width="100"
              src="https://cdn.shopify.com/s/files/1/0222/7290/1216/products/AC220BL_01G_1920x1080.jpg?v=1637580156"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
