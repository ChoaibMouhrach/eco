import Image from "next/image";

const data = [
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/b4l-150x60-trans.png?v=1681484473",
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/i4l-240x60-trans.png?v=1681484780",
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/t4l-150x60-trans.png?v=1681484473",
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/bso-80x60-trans.png?v=1681484780",
];

export function Brands() {
  return (
    <div className="container mx-auto grid lg:grid-cols-4 gap-4">
      {data.map((link) => (
        <div className="bg-gray-50 p-4 flex items-center justify-center">
          <Image
            width="400"
            height="400"
            className="w-28 object-fit h-16"
            src={link}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
