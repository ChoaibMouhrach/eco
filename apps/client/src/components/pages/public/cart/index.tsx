import Image from "next/image";
import { PublicLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const data = [
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
  {
    name: "Square And Round Downpipe Rain Diverter - All Colours",
    image:
      "https://build4less.co.uk/cdn/shop/products/RVS1W-0_1920x1080@2x.jpg?v=1634802767",
    price: 120,
    category: "Rainwater Diverter",
    quantity: 1,
  },
];

export default function CartPage() {
  return (
    <PublicLayout>
      <div className="container gap-4 grid grid-cols-6 h-96 my-8">
        <div className="col-start-1 col-end-4 bg-gray-50 overflow-y-scroll">
          <div className="p-4">
            {data.map(({ name, image, price, quantity }) => (
              <div className="flex items-center p-3 gap-4">
                <div>
                  <Image
                    src={image}
                    width="100"
                    height="100"
                    className="w-12 h-12"
                    alt=""
                  />
                </div>
                <div>
                  <span className="text-sm">{name}</span>
                  <span>{price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </Button>
                  <Input value={quantity} className="text-center w-12" />
                  <Button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Button>
                  <Button variant="destructive">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-start-4 bg-gray-50 col-end-7">
          <div className="p-4">
            <form className="grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-2">
                {/*
                  <label htmlFor="name" className="text-sm"> 
                    Name on the card
                  </label>
                */}
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                {/* <label className="text-sm">Card Number</label> */}
                <Input placeholder="Card Number" />
              </div>
              <div className="flex flex-col gap-2">
                {/* <label className="text-sm">MM/YY</label> */}
                <Input placeholder="02/27" />
              </div>
              <div className="flex flex-col gap-2">
                {/* <label className="text-sm">CVC</label> */}
                <Input placeholder="656" />
              </div>
              <Button>Confirm Order</Button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
