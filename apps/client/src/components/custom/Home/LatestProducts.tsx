import { IProduct } from "@/index";
import ProductCard from "../ProductCard";

const data: IProduct[] = [
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
  },
];

export default function LatestProducts() {
  return (
    <div className="container mx-auto grid lg:grid-cols-5 gap-4">
      {data.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}
