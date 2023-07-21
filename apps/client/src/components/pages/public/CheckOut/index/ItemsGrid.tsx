import Image from "next/image";
import { MdOutlineAdd, MdOutlineDelete, MdOutlineRemove } from "react-icons/md";
import { ChangeEvent, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks";
import { Input } from "@/components/ui/input";

export function ItemsGrid() {
  const { data: cartItems, update, remove } = useCart();

  return (
    <div className="p-4 border border-gray rounded-md col-start-1 col-end-3 flex flex-col gap-4 h-fit">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl">Order Products</h2>
        <p className="text-neutral-500 text-sm">
          The products you chose for this order.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        {cartItems.length ? (
          cartItems.map((item, index) => (
            <Fragment key={item.product.id}>
              <div className="flex items-center gap-4 text-sm">
                <div className="w-24 h-24 relative">
                  <Image
                    fill
                    className="absolute object-contain"
                    src={`${process.env.API_STORAGE_URL}/${item.product.images[0].path}`}
                    alt={item.product.name}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="font-semibold">
                    {item.product.name.slice(0, 20)}
                  </span>
                  <div className="text-neutral-500">
                    {item.product.price}$ x {item.quantity} ={" "}
                    {(item.quantity * item.product.price).toFixed(2)}
                  </div>
                  <span className="text-neutral-500">
                    {item.product.category.name}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2">
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
              {index !== cartItems.length - 1 && <Separator />}
            </Fragment>
          ))
        ) : (
          <p className="flex items-center text-neutral-500 text-sm text-center">
            Visit our shop first
          </p>
        )}
      </div>
    </div>
  );
}
