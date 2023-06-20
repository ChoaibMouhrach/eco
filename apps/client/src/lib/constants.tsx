import {
  MdOutlineAddHome,
  MdOutlineAddShoppingCart,
  MdOutlineDashboard,
  MdOutlineInbox,
  MdOutlineInsertDriveFile,
  MdOutlineOutbox,
  MdOutlinePerson3,
  MdOutlinePerson4,
  MdOutlinePersonAddAlt1,
  MdOutlineShoppingCart,
  MdOutlineShoppingCartCheckout,
  MdOutlineStore,
  MdOutlineTag,
  MdOutlineUploadFile,
} from "react-icons/md";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { SideNavLinkItem } from "..";

export const sideNavLinks: SideNavLinkItem[] = [
  {
    name: "Dashboard",
    Icon: MdOutlineDashboard,
    href: "/dashboard",
  },
  {
    name: "Products",
    Icon: MdOutlineShoppingCart,
    href: "/dashboard/products",
  },
  {
    name: "New Product",
    Icon: MdOutlineShoppingCartCheckout,
    href: "/dashboard/products/create",
  },
  {
    name: "Categories",
    Icon: MdOutlineInsertDriveFile,
    href: "/dashboard/categories",
  },
  {
    name: "New Category",
    Icon: MdOutlineUploadFile,
    href: "/dashboard/categories/create",
  },
  {
    name: "Tags",
    Icon: MdOutlineTag,
    href: "/dashboard/tags",
  },
  {
    name: "New Tag",
    Icon: MdOutlineAddHome,
    href: "/dashboard/tags/create",
  },
  {
    name: "Units",
    Icon: AiOutlineDeploymentUnit,
    href: "/dashboard/units",
  },
  {
    name: "New Unit",
    Icon: AiOutlineDeploymentUnit,
    href: "/dashboard/units/create",
  },
  {
    name: "Users",
    Icon: MdOutlinePerson3,
    href: "/dashboard/users",
  },
  {
    name: "New User",
    Icon: MdOutlinePersonAddAlt1,
    href: "/dashboard/users/create",
  },
  {
    name: "Purchases",
    Icon: MdOutlineInbox,
    href: "/dashboard/purchases",
  },
  {
    name: "New Purchase",
    Icon: MdOutlineOutbox,
    href: "/dashboard/purchases/create",
  },
  {
    name: "Orders",
    Icon: MdOutlineStore,
    href: "/dashboard/orders",
  },
  {
    name: "New Order",
    Icon: MdOutlineAddShoppingCart,
    href: "/dashboard/orders/create",
  },
  {
    name: "Profile",
    Icon: MdOutlinePerson4,
    href: "/dashboard/profile",
  },
];
