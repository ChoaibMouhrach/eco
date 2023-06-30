import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Exclusives() {
  return (
    <div className="container mx-auto lg:h-96 grid gap-4 lg:grid-cols-3 grid-rows-2">
      <div className="bg-gray-50 grid lg:grid-cols-2 p-4 lg:col-start-1 lg:col-end-3 row-start-1 row-end-3 gap-4">
        <div className="flex items-center justify-center">
          <Image
            className=""
            src="https://cdn.shopify.com/s/files/1/0222/7290/1216/products/AC340BL_01C_1920x1080.jpg?v=1636366206"
            width="300"
            height="300"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold tracking-wide">
              Corrapol-BT Corrugated Bitumen Fixings 100 Pack - All Colours
            </span>
            <p className="text-neutral-500 text-sm">
              CORRAPOL® Bitumen roof sheet fixings are designed to be used with
              the Corrapol Corrugated Bitumen Roof Sheets when fitting to
              timber.Each Corrugated Roof Sheet requires 20 fixings.{" "}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-700 text-lg font-semibold">$ 1500</span>
            <span className="text-neutral-500 line-through">$ 1800</span>
          </div>
          <Button className="w-fit">Shop now</Button>
        </div>
      </div>
      <div className="bg-gray-50 p-4 grid grid-cols-2">
        <div className="flex flex-col gap-4 justify-center">
          <span className="font-semibold tracking-wide">
            Corrapol-BT Corrugated Bitumen Fixings 100 Pack - All Colours
          </span>
          <div className="flex items-center gap-4">
            <span className="text-red-700 text-lg font-semibold">$ 1500</span>
            <span className="text-neutral-500 line-through">$ 1800</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0222/7290/1216/products/AC340BL_01C_1920x1080.jpg?v=1636366206"
            width="100"
            height="100"
            alt=""
          />
        </div>
      </div>
      <div className="bg-gray-50 p-4 grid grid-cols-2">
        <div className="flex flex-col gap-4 justify-center">
          <span className="font-semibold tracking-wide">
            Corrapol-BT Corrugated Bitumen Fixings 100 Pack - All Colours
          </span>
          <div className="flex items-center gap-4">
            <span className="text-red-700 text-lg font-semibold">$ 1500</span>
            <span className="text-neutral-500 line-through">$ 1800</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0222/7290/1216/products/AC340BL_01C_1920x1080.jpg?v=1636366206"
            width="100"
            height="100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
