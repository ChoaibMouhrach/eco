import { MdOutlineAdd, MdOutlineDashboard } from "react-icons/md";
import { IconType } from "react-icons";

interface SideBarNavigation {
  name: string;
  href?: string;
  icon: IconType;
  children?: Omit<SideBarNavigation, "children">[];
}

export const sideBarNavigation: SideBarNavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    name: "Orders",
    icon: MdOutlineDashboard,
    children: [
      {
        name: "List",
        href: "/dashboard/orders",
        icon: MdOutlineAdd,
      },
      {
        name: "Create",
        href: "/dashboard/orders/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Purchases",
    icon: MdOutlineDashboard,
    children: [
      {
        name: "List",
        href: "/dashboard/purchases",
        icon: MdOutlineAdd,
      },
      {
        name: "Create",
        href: "/dashboard/purchases/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Products",
    icon: MdOutlineDashboard,
    children: [
      {
        name: "List",
        href: "/dashboard/products/create",
        icon: MdOutlineAdd,
      },
      {
        name: "Create",
        href: "/dashboard/products/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Categories",
    icon: MdOutlineDashboard,
    children: [
      {
        name: "List",
        href: "/dashboard/categories/create",
        icon: MdOutlineAdd,
      },
      {
        name: "Create",
        href: "/dashboard/categories/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Units",
    icon: MdOutlineDashboard,
    children: [
      {
        name: "List",
        href: "/dashboard/units/create",
        icon: MdOutlineAdd,
      },
      {
        name: "Create",
        href: "/dashboard/units/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Tags",
    icon: MdOutlineDashboard,
    children: [
      {
        name: "List",
        href: "/dashboard/tags/create",
        icon: MdOutlineAdd,
      },
      {
        name: "Create",
        href: "/dashboard/tags/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: MdOutlineDashboard,
  },
];
