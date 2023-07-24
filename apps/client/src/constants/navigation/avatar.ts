interface AvatarNavigation {
  name: string;
  href: string;
  role?: "admin" | "member";
}

export const avatarNavigation: AvatarNavigation[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    role: "admin",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
  },
];
