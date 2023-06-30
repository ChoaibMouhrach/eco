import Image from "next/image";
import { useState } from "react";
import CartIcon from "@/components/icons/Cart";
import { PublicLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";

const product = {
  name: "Rtx 3090 24gb Gddr6x 384-bit 19.5 Gbps Pci Express 4.0 Gaming Graphics Card",
  description: ` 
  Refroidisseur Liquide All-in -one avec Affichage LCD Circulaire
  2 Ventilateurs 140mm ARGB
  Nouvelle pompe haute performance
  Écran LCD couleur circulaire unique de 60×60 mm, lecture vidéo / texte personnalisé.
  Orientation réglable de l’écran.Peut être tournée de 330 degrés.
  Ventilateurs ARGB haute performance, à faible niveau sonore, avec nanolubrification au graphène.
  Synchronisation RGB FUSION 2.0 avec d’autres appareils AORUS.
  `,
  price: "$ 1,500",
  unit: "piece",
  category: "Graphics Card",
  tags: ["Graphics Card", "Gaming", "Nvidia"],
  images: [
    "https://easygaming.ma/wp-content/uploads/2023/01/Radeon-RX-6700-XT-Challenger-D-12GBL1.png",
    "https://easygaming.ma/wp-content/uploads/2023/01/Radeon-RX-6700-XT-Challenger-D-12GBL1.png",
    "https://easygaming.ma/wp-content/uploads/2023/01/Radeon-RX-6700-XT-Challenger-D-12GBL1.png",
    "https://easygaming.ma/wp-content/uploads/2022/11/Radeon-RX-6700-XT-Challenger-D-12GBL3.png",
    "https://easygaming.ma/wp-content/uploads/2023/05/1000-3.webp",
  ],
};

export default function Products() {
  const [image, setImage] = useState(product.images[0]);

  return (
    <PublicLayout>
      <div className="container grid lg:grid-cols-2 py-8">
        <div className="grid grid-cols-6">
          <div className="flex flex-col gap-4 h-96 overflow-y-scroll">
            {product.images.map((productImage) => (
              <Image
                onClick={() => setImage(productImage)}
                src={image}
                width="300"
                height="300"
                alt=""
              />
            ))}
          </div>
          <div className="col-start-2 col-end-7 flex items-center justify-center">
            <Image src={image} width="300" height="300" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="p-2 rounded-md bg-gray-900 text-white">
              {product.category}
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-wide">
            {product.name}
          </h1>
          <p className="text-neutral-500 tracking-wide">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {product.tags.map((tag) => (
              <span className="bg-gray-50 p-2 rounded-md text-sm">{tag}</span>
            ))}
          </div>
          <span className="text-xl font-semibold">
            {product.price} per {product.unit}
          </span>
          <div>
            <Button className="flex items-center gap-2">
              <CartIcon />
              <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
