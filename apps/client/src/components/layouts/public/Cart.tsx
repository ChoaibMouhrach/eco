import { ChangeEvent, Fragment, useEffect } from "react";
import Image from "next/image";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineRemove } from "react-icons/md";
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks";

interface CartProps {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Cart({ setCartOpen, cartOpen }: CartProps) {
  const router = useRouter();
  const { load, total, data: cartItems, remove, update } = useCart();

  useEffect(() => {
    load();
  }, [cartOpen]);

  return (
    <Sheet onOpenChange={setCartOpen} open={cartOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-4">
            <SheetTitle>Cart ({cartItems.length})</SheetTitle>
            <Separator />
            <div className="flex flex-col gap-4 text-sm">
              {cartItems.map((item) => (
                <Fragment key={item.product.id}>
                  <div className="flex gap-4 items-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded">
                      <Image
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="absolute object-contain"
                        loading="lazy"
                        alt={item.product.name}
                        src={`${process.env.API_STORAGE_URL}/${item.product.images[0].path}`}
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <span className="font-semibold tracking-wide">
                        {item.product.name.slice(0, 15)}
                      </span>
                      <span className="text-neutral-500">
                        {item.product.price} x {item.quantity} ={" "}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-neutral-500">
                        {item.product.price}
                        <sup>$</sup>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        disabled={item.quantity < 2}
                        onClick={() =>
                          update({
                            id: item.product.id,
                            direc: false,
                          })
                        }
                        variant="outline"
                        className="p-1 px-2"
                      >
                        <MdOutlineRemove />
                      </Button>
                      <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const quantity = Number(e.target.value);
                          update({
                            id: item.product.id,
                            quantity: quantity < 1 ? 1 : quantity,
                          });
                        }}
                        value={item.quantity}
                        type="number"
                        min="1"
                        className="w-12 text-center"
                      />
                      <Button
                        onClick={() =>
                          update({
                            id: item.product.id,
                            direc: true,
                          })
                        }
                        variant="outline"
                        className="p-1 px-2"
                      >
                        <MdOutlineAdd />
                      </Button>
                      <Button
                        onClick={() => remove(item.product.id)}
                        variant="outline"
                        className="p-1 px-2"
                      >
                        <MdOutlineDelete />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </Fragment>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <span className="font-semibold">Subtotal</span>
            <span className="text-end">$ {total()}</span>
            <span className="font-semibold">Shipping</span>
            <span className="text-end">Free</span>
            <Separator className="col-start-1 col-end-3" />
            <span className="font-semibold">Total</span>
            <span className="text-end">$ {total()}</span>
            <Button
              onClick={() => router.push("/checkout")}
              className="col-start-1 col-end-3"
            >
              Proceed to Checkout
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
