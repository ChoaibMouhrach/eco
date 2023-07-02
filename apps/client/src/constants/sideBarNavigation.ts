import {
  MdOutlineAdd,
  MdOutlineCategory,
  MdOutlineCollectionsBookmark,
  MdOutlineDashboard,
  MdOutlineGasMeter,
  MdOutlineListAlt,
  MdOutlinePeopleOutline,
  MdOutlinePersonOutline,
  MdOutlineShoppingBasket,
  MdOutlineShoppingCart,
  MdOutlineTag,
} from "react-icons/md";
import { SideBarNavigation } from "@/interfaces/Common";

export const sideBarNavigation: SideBarNavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    name: "Orders",
    icon: MdOutlineShoppingBasket,
    children: [
      {
        name: "List",
        href: "/dashboard/orders",
        icon: MdOutlineListAlt,
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
    icon: MdOutlineCollectionsBookmark,
    children: [
      {
        name: "List",
        href: "/dashboard/purchases",
        icon: MdOutlineListAlt,
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
    icon: MdOutlineShoppingCart,
    children: [
      {
        name: "List",
        href: "/dashboard/products",
        icon: MdOutlineListAlt,
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
    icon: MdOutlineCategory,
    children: [
      {
        name: "List",
        href: "/dashboard/categories",
        icon: MdOutlineListAlt,
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
    icon: MdOutlineGasMeter,
    children: [
      {
        name: "List",
        href: "/dashboard/units",
        icon: MdOutlineListAlt,
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
    icon: MdOutlineTag,
    children: [
      {
        name: "List",
        href: "/dashboard/tags",
        icon: MdOutlineListAlt,
      },
      {
        name: "Create",
        href: "/dashboard/tags/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Users",
    icon: MdOutlinePeopleOutline,
    children: [
      {
        name: "List",
        href: "/dashboard/users",
        icon: MdOutlineListAlt,
      },
      {
        name: "Create",
        href: "/dashboard/users/create",
        icon: MdOutlineAdd,
      },
    ],
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: MdOutlinePersonOutline,
  },
];
