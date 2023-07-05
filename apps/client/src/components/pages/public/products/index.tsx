import { useState } from "react";
import { Pagination, ProductCard } from "@/components/custom";
import { PublicLayout } from "@/components/layouts";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
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

export default function ProductsPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  return (
    <PublicLayout>
      <div className="container grid lg:grid-cols-6 py-8 gap-4">
        <div className="flex flex-col gap-4">
          <span>Categories</span>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <span>Price</span>
          <div className="grid grid-cols-2 gap-4">
            <Input defaultValue="0" />
            <Input defaultValue="100" />
          </div>
        </div>
        <div className="lg:col-start-2 lg:col-end-7 flex flex-col gap-4">
          <Input placeholder="Search..." />
          <div className="grid lg:grid-cols-5 gap-4">
            {data.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            pagesCount={10}
          />
        </div>
      </div>
    </PublicLayout>
  );
}
