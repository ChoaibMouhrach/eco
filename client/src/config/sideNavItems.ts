import { IconType } from "react-icons";
import { MdOutlineDashboard, MdOutlinePersonOutline, MdOutlineProductionQuantityLimits } from "react-icons/md"

type SideNavConfig = {
  title: string;
  href: string;
  icon: IconType
}[]

const sideNavItems: SideNavConfig = [
  {
    title: "Dashboard",
    href: "",
    icon: MdOutlineDashboard
  },
  {
    title: "Products",
    href: "/products",
    icon: MdOutlineProductionQuantityLimits
  },
  {
    title: "Profile",
    href: "/profile",
    icon: MdOutlinePersonOutline
  }
]

export default sideNavItems
