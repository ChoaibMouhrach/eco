import { Inter } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import Footer from "../custom/Footer";
import Heading from "../custom/Heading";
import NavigationBar from "../custom/Navigation/NavigationBar";
import { navigationData } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import HeartIcon from "../icons/Heart";
import CartIcon from "../icons/Cart";
import { IUser } from "@/interfaces/User";

const inter = Inter({ subsets: ["latin"] });

function MobileNagiationBar() {
  return (
    <div className="container mx-auto flex py-8 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="">
          <HeartIcon className="!h-4 !w-4" />
        </Button>
        <Button variant="outline" className="">
          <CartIcon className="!h-4 !w-4" />
        </Button>
      </div>
      <Accordion type="single" collapsible>
        {navigationData.map(({ trigger, elements }) => (
          <AccordionItem value={trigger}>
            <AccordionTrigger>{trigger}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {elements.map((element) => (
                  <Link className="p-3" href={element.href} key={element.name}>
                    {element.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

interface PublicLayoutProps {
  children: React.ReactNode;
  user?: IUser;
}

export function PublicLayout({ children, user }: PublicLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <main className={inter.className}>
      <Heading />
      <NavigationBar user={user} open={open} setOpen={setOpen} />
      <section className="flex flex-col gap-16 h-[calc(100vh_-_112px)] overflow-y-scroll">
        {open ? (
          <MobileNagiationBar />
        ) : (
          <>
            {children}
            <Footer />
          </>
        )}
      </section>
    </main>
  );
}
