import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image: string;
}

export default function CategoryCard({ image, name }: CategoryCardProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-md flex flex-col gap-4 items-center">
      <Image className="h-28 w-28 object-fit" src={image} alt="" />
      <span className="text-lg font-semibold">{name}</span>
    </div>
  );
}
