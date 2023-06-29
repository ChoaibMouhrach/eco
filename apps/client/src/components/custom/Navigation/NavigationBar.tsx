import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../../ui/button";
import CartIcon from "../../icons/Cart";
import HeartIcon from "../../icons/Heart";
import { navigationData } from "@/constants";
import MenuIcon from "../../icons/Menu";
import { IUser } from "@/interfaces/User";
import NavigationAvatar from "./NavigationAvatar";
import LogoIcon from "@/components/icons/Logo";

interface NavigationBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser;
}

export default function NavigationBar({
  open,
  setOpen,
  user,
}: NavigationBarProps) {
  return (
    <nav className="h-16 flex items-stretch border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >
            <MenuIcon className="!w-4 !h-4" />
          </Button>
          <Link href="/">
            <LogoIcon />
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navigationData.map(({ trigger, elements }) => (
                <NavigationMenuItem key={trigger}>
                  <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-6 md:w-[800px] lg:grid-cols-3">
                      {elements.map(({ name, description }) => (
                        <li className="row-span-3" key={name}>
                          <NavigationMenuLink
                            href={name}
                            className="flex flex-col group gap-2 p-4 hover:bg-gray-50 rounded-md hover:drop-shadow-sm animate duration-100"
                          >
                            <span className="font-semibold text-sm tracking-wide group-hover:underline">
                              {name}
                            </span>
                            <span className="text-sm text-neutral-400">
                              {description}
                            </span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="w-12 hidden lg:flex">
            <HeartIcon />
          </Button>
          <Button variant="outline" className="w-12 hidden lg:flex">
            <CartIcon />
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
