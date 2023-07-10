import Image from "next/image";
import { useState } from "react";
import { IImage } from "@/interfaces/Image";

interface ProductImagesProps {
  images: IImage[];
  name: string;
}

export function ProductImages({ images, name }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<IImage>(images[0]);

  return (
    <div className="flex flex-col rounded-md overflow-hidden gap-4">
      <div className="h-96 flex items-stretch bg-gray-100  p-16">
        <Image
          className="h-full object-contain w-full"
          src={`${process.env.API_STORAGE_URL}/${selectedImage.path}`}
          width="512"
          height="512"
          alt={name}
        />
      </div>

      <div className="h-32 flex items-stretch overflow-x-scroll scroll-bar gap-4">
        {images.map((image) => (
          <button
            onClick={() => setSelectedImage(image)}
            key={image.id}
            className="flex w-28 cursor-pointer hover:bg-gray-200 items-stretch shrink-0 bg-gray-100 rounded-md  p-4"
            type="button"
          >
            <Image
              className="object-contain"
              src={`${process.env.API_STORAGE_URL}/${image.path}`}
              width="128"
              height="128"
              alt={name}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
