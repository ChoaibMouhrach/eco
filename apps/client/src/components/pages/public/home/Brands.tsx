import Image from "next/image";

const data = [
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/b4l-150x60-trans.png?v=1681484473",
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/i4l-240x60-trans.png?v=1681484780",
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/t4l-150x60-trans.png?v=1681484473",
  "https://cdn.shopify.com/s/files/1/0579/4807/8277/files/bso-80x60-trans.png?v=1681484780",
];

export function Brands() {
  return (
    <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((link) => (
        <div
          key={link}
          className="bg-gray-50 rounded-md px-4 py-6 flex items-center justify-center"
        >
          <Image
            width="120"
            height="120"
            className="object-contain"
            src={link}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
