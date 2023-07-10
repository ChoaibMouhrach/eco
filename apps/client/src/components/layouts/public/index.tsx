import { AiOutlineHeart } from "react-icons/ai";
import { Inter } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { navigationData } from "@/constants";
import { IUser } from "@/interfaces/User";
import { Button } from "@/components/ui/button";
import { Footer, Heading, NavigationBar } from "@/components/custom";

const inter = Inter({ subsets: ["latin"] });

function MobileNagiationBar() {
  return (
    <div className="container mx-auto flex py-8 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="">
          <AiOutlineHeart className="!h-4 !w-4" />
        </Button>
        <Button variant="outline" className="">
          <MdOutlineShoppingCart className="!h-4 !w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {navigationData.map((link) => (
          <Link
            className="text-sm text-neutral-600"
            key={link.name}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

interface PublicLayoutProps {
  children: React.ReactNode;
  user?: IUser;
  footer?: boolean;
}

export function PublicLayout({ children, footer, user }: PublicLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <main className={inter.className}>
      <Heading />
      <NavigationBar user={user} open={open} setOpen={setOpen} />
      <main className="flex flex-col gap-16 h-[calc(100vh_-_112px)] overflow-y-scroll">
        {open ? (
          <MobileNagiationBar />
        ) : (
          <>
            {children}
            {footer !== false && <Footer />}
          </>
        )}
      </main>
    </main>
  );
}
