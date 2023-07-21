import Link from "next/link";
import { useEffect } from "react";
import { LuPartyPopper } from "react-icons/lu";
import { useCart } from "@/hooks";
import { Button } from "@/components/ui/button";

export function Success() {
  const { load } = useCart();

  useEffect(() => {
    localStorage.removeItem("cartItems");
    load();
  }, []);

  return (
    <div className="container h-[600px] flex items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <LuPartyPopper className="text-4xl" />
        <p className="text-green-700 text-2xl">Order placed successfully</p>
        <Button asChild variant="secondary">
          <Link href="/">{"<-"} Home</Link>
        </Button>
      </div>
    </div>
  );
}
