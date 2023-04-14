import Link from "next/link";
import DropDownMenu from "../DropDown";
import { MdMenu } from "react-icons/md"
import navItems from "@/config/navItems";

export default function Nav({ navBarShown, setNavBarShown }: { navBarShown: boolean, setNavBarShown: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <nav className="h-16 flex items-stretch justify-center" >
      <div className="container px-4 justify-between border-b flex items-center" >

        <div className="flex items-center gap-3" >
          <button className="text-2xl lg:hidden" onClick={() => setNavBarShown(!navBarShown)} >
            <MdMenu />
          </button>
          <Link href="/" className="text-xl font-bold" >QM</Link>
        </div>

        <div className="flex-grow px-8 flex gap-4 hidden lg:flex" >
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="text-sm text-gray-700 font-medium tracking-wide hover:text-gray-900" >
              {item.title}
            </Link>
          ))}
        </div>
        <div>
          {/*
          <Button href="/sign-in" className="py-3" >
            Login
          </Button>
          */}
          <DropDownMenu />
        </div>
      </div>
    </nav>
  )

}
