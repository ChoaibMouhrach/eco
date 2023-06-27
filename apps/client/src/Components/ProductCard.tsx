import Image from "next/image";
import Link from "next/link";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Button } from "ui";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  id: number;
}

export default function ProductCard({
  image,
  title,
  price,
  id,
}: ProductCardProps) {
  return (
    <div className="rounded-md flex flex-col gap-4">
      <div className="h-64 w-full bg-gray-50 flex justify-center items-center rounded-md relative">
        <Image className="w-32 object-fit h-32 " src={image} alt="" />
        <div className="absolute top-0 right-0 p-4">
          <Button variant="text">
            <MdOutlineAddShoppingCart className="text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between w-full text-sm font-bold">
        <Link href={`/shop/${id}`}>{title}</Link>
        <span className="text-sm">$ {price}</span>
      </div>
      <div className="w-full">
        <Button variant="outlined" className="text-sm w-full">
          <MdOutlineAddShoppingCart />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
