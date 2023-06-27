import Image from "next/image";
import { Button, Input } from "ui";
import PublicLayout from "@/Components/Layouts/PublicLayout";
import { User } from "@/index";
import cement from "../../../../public/cement.png";

interface ShopProductPageProps {
  user?: User;
}

export default function ShopProductPage({ user }: ShopProductPageProps) {
  return (
    <PublicLayout user={user}>
      <div className="container mx-auto p-4 grid gap-8 h-[calc(100vh_-_64px)] overflow-y-scroll lg:grid-cols-2 gap-4 custom-scrollbar">
        <div className="flex h-96 gap-8">
          <div className="w-20 lg:w-32 custom-scrollbar overflow-y-scroll shrink-0 p-4 flex flex-col gap-4 border border-gray-300 rounded-md">
            <Image className="h-16 shrink-0" src={cement} alt="" />
          </div>
          <div className="">
            <Image src={cement} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-start-2 lg:col-end-3">
          <h1 className="text-2xl font-bold tracking-wide">
            Cooler Master SK620 (Switches TTC Red)
          </h1>
          <p>
            Clavier mécanique compact pour gamer Switches TTC Red : durée de vie
            de 50 millions de frappes Contrôles à la volée Polling Rate : 1000
            Hz Conception en aluminium brossé Rétroéclairage RGB LED
            personnalisable Câble fixe de 1.8 m Connectique : USB Dimensions :
            293 x 103 x 30.28 mm Poids : 377 g
          </p>
          <span>$ 6530</span>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Button variant="text">-</Button>
              <Input defaultValue="1" className="w-12 text-center" />
              <Button variant="text">+</Button>
            </div>
            <div>
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
