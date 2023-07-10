import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../../../../public/Hero.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div>
      <div className="h-[600px] relative">
        <Image
          src={HeroImage}
          className="h-full w-full object-cover"
          height="0"
          width="0"
          alt=""
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-white top-0 right-0  backdrop-blur-md">
          <div className="container h-full gap-4 flex flex-col justify-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl lg:w-2/3 lg:text-6xl font-bold">
                Your Trusted Partner for Superior Building Materials and
                Unmatched Expertise
              </h1>
              <p className="text-lead lg:w-1/2 text-gray-700 ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
                culpa sapiente, ab voluptatem velit recusandae deleniti
                architecto laborum ipsa sit, eum labore minus atque temporibus.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild className="w-fit">
                <Link className="text-lg" href="/products">
                  Visit Our shop
                </Link>
              </Button>
              <Button asChild className="w-fit" variant="outline">
                <Link className="text-lg" href="/products">
                  About us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
