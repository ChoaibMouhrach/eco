import { Button } from "ui";
import Image from "next/image";
import { MdOutlineAddShoppingCart, MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import cement from "../../../../public/cement.png";
import { User } from "@/index";
import PublicLayout from "../../Layouts/PublicLayout";

interface ShopPageProps {
  user?: User;
}

export default function ShopPage({ user }: ShopPageProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PublicLayout user={user}>
      <div className="lg:hidden h-16 border-b border-gray-300 flex items-center px-4 lg:px-0">
        <Button onClick={() => setOpen(!open)} variant="text">
          <MdOutlineMenu className="text-lg" />
        </Button>
      </div>
      <div className="h-[calc(100vh_-_128px)] lg:h-[calc(100vh_-_64px)] grid lg:grid-cols-5 gap-4 container mx-auto">
        <div
          className={`overflow-y-scroll flex  custom-scrollbar flex-col gap-4 p-4 lg:px-0 ${
            open ? "" : "hidden lg:flex"
          }`}
        >
          <div>
            <h3>Popular Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((number) => (
              <div className="p-2 rounde-md bg-gray-50 text-sm">{number}</div>
            ))}
          </div>
          <div>
            <h3>Popular Categories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((number) => (
              <div className="p-2 rounde-md bg-gray-50 text-sm">{number}</div>
            ))}
          </div>
          <div>
            <h3>Price Range</h3>
          </div>
          <div>
            <input className="w-full" type="range" />
          </div>
        </div>
        <div
          className={`overflow-y-scroll custom-scrollbar p-4 lg:px-0 lg:pr-4 gap-4 lg:col-start-2 lg:col-end-6 grid lg:grid-cols-4 ${
            open ? "hidden" : ""
          }`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <div className="rounded-md flex flex-col gap-4">
              <div className="h-64 w-full bg-gray-50 flex justify-center items-center rounded-md relative">
                <Image className="w-32 object-fit h-32 " src={cement} alt="" />
                <div className="absolute top-0 right-0 p-4">
                  <Button variant="text">
                    <MdOutlineAddShoppingCart className="text-lg" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between w-full text-sm font-bold">
                <span>Some Product</span>
                <span className="text-sm">$ 999</span>
              </div>
              <div className="w-full">
                <Button variant="outlined" className="text-sm w-full">
                  <MdOutlineAddShoppingCart />
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
