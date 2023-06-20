import Image from "next/image";
import { Button } from "ui";
import {
  MdOutlineAddShoppingCart,
  MdOutlineArrowRightAlt,
} from "react-icons/md";
import Link from "next/link";
import PublicLayout from "../Layouts/PublicLayout";
import { User } from "@/index";
import banner from "../../../public/banner.jpg";
import cement from "../../../public/cement.png";
import Logo from "../Logo";

interface HomePageProps {
  user?: User;
}

const categories = [
  "Lumber",
  "Roofing Materials",
  "Flooring",
  "Insulation",
  "Doors and Windows",
  "Plumbing",
];

function Header() {
  return (
    <div className="relative">
      <Image className="h-[60vh] object-cover" src={banner} alt="" />
      <div className="absolute h-full w-full top-0 left-0 bg-[rgba(255,255,255,0.6)] lg:bg-transparent">
        <div className="flex justify-center lg:justify-start items-center container mx-auto h-full">
          <div className="lg:w-[50%] px-4 text-center flex flex-col gap-4">
            <h2 className="text-xl text-center lg:text-start lg:text-6xl font-bold tracking-wide">
              Enhance Your Construction Projects with Our Materials
            </h2>
            <p className="lg:w-[70%] text-center lg:text-start text-sm lg:text-md">
              Welcome to eco, your premier online destination for all your
              building material needs. We take immense pride in offering an
              extensive selection of high-quality building supplies, carefully
              curated to meet the diverse requirements of construction projects
              of all sizes.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button>
                View Our Shop
                <MdOutlineArrowRightAlt />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section className="container px-4 lg:px-0 mx-auto flex flex-col gap-16">
      <div className="text-center">
        <h3 className="text-2xl font-semibold tracking-wide">CATEGORIES</h3>
      </div>
      <div className="grid lg:grid-cols-6 gap-2">
        {categories.map((category) => (
          <div className="bg-gray-50 p-3 rounded-md flex flex-col gap-4 items-center">
            <Image className="h-28 w-28 object-fit" src={cement} alt="" />
            <span className="text-lg font-semibold">{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentProducts() {
  return (
    <section className="container px-4 lg:px-0 mx-auto flex flex-col gap-16">
      <div className="text-center">
        <h3 className="text-2xl font-semibold tracking-wide">
          RECENT PRODUCTS
        </h3>
      </div>
      <div className="grid lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 8].map(() => (
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
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-gray-300 ">
      <div className="container mx-auto grid px-4 lg:px-0 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4 text-white">
          <Logo />
          <p>Enhance Your Construction Projects with Our Materials</p>
        </div>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <Link href={`/${category}`}>{category}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <Link href={`/${category}`}>{category}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <Link href={`/${category}`}>{category}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function HomePage({ user }: HomePageProps) {
  return (
    <PublicLayout user={user}>
      <section className="flex flex-col gap-16">
        <Header />
        <Categories />
        <RecentProducts />
        <Footer />
      </section>
    </PublicLayout>
  );
}
