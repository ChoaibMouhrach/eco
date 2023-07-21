import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks";

export function OrderDetails() {
  const { total } = useCart();

  return (
    <div className="bg-gray-50 p-4 rounded-md flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl">Order details</h2>
        <p className="text-neutral-500 text-sm">
          Here are your order information
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="font-semibold">Subtotal</span>
        <span className="text-end">$ {total()}</span>
        <span className="font-semibold">Shipping</span>
        <span className="text-end">Free</span>
        <Separator className="col-start-1 col-end-3" />
        <span className="font-semibold">Total</span>
        <span className="text-end font-semibold">$ {total()}</span>
      </div>
    </div>
  );
}
