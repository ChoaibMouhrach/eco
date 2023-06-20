import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { Button } from "ui";
import { useState } from "react";
import Logo from "../Logo";
import { User } from "@/index";
import Avatar from "../Avatar";

interface NavigationLinksProps {
  location?: "bar" | "body";
  user?: User;
}

function NavigationLinks({ user, location = "bar" }: NavigationLinksProps) {
  return (
    <div
      className={`${
        location === "bar" ? "hidden" : "flex flex-col h-full justify-center"
      } lg:flex items-center gap-4`}
    >
      <Link className="text-neutral-600 hover:text-gray-900" href="/">
        Home
      </Link>
      <Link className="text-neutral-600 hover:text-gray-900" href="/shop">
        Shop
      </Link>
      <Link className="text-neutral-600 hover:text-gray-900" href="/about-us">
        About us
      </Link>
      <Link className="text-neutral-600 hover:text-gray-900" href="/contact-us">
        Contact us
      </Link>
      {!user && <Button href="/sign-in">Sign In</Button>}
    </div>
  );
}

interface PublicLayoutProps {
  children: React.ReactNode;
  user?: User;
}

export default function PublicLayout({ children, user }: PublicLayoutProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <main className="h-screen">
      <nav className="h-16 flex items-stretch border-b border-gray-300">
        <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              <Button
                className="lg:hidden"
                onClick={() => setOpen(!open)}
                variant="text"
              >
                <MdOutlineMenu className="text-lg" />
              </Button>
              <Logo className="!text-xl" />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <NavigationLinks user={user} />
            {user && <Avatar user={user} />}
          </div>
        </div>
      </nav>
      <div className="h-[calc(100vh_-_64px)]">
        {open ? <NavigationLinks user={user} location="body" /> : children}
      </div>
    </main>
  );
}
