import Link from "next/link";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";

export function Error() {
  return (
    <div className="container h-[600px] flex items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <MdOutlineErrorOutline className="text-4xl" />
        <p className="text-red-700 text-2xl">
          Payment failed! Something went wrong
        </p>
        <Button asChild variant="secondary">
          <Link href="/">{"<-"} Home</Link>
        </Button>
      </div>
    </div>
  );
}
