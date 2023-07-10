import Link from "next/link";
import { MdOutlineMenu, MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "../../ui/button";
import { navigationData } from "@/constants";
import { IUser } from "@/interfaces/User";
import NavigationAvatar from "./avatar";
import { Logo } from "../common";

interface NavigationBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser;
}

export function NavigationBar({ open, setOpen, user }: NavigationBarProps) {
  return (
    <nav className="h-16 flex items-stretch border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >
            <MdOutlineMenu className="!w-4 !h-4" />
          </Button>
          <Logo />
          <div className="hidden lg:flex items-center gap-4">
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
        <div className="flex items-center gap-4">
          <Button variant="outline" className="w-12 hidden lg:flex">
            <AiOutlineHeart />
          </Button>
          <Button variant="outline" className="w-12 hidden lg:flex">
            <MdOutlineShoppingCart />
          </Button>
          {user ? (
            <NavigationAvatar user={user} />
          ) : (
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
