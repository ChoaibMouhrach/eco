import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropDownItemProps {
  children: React.ReactNode;
  className?: string;
}

export function DropDownItem({ children, className }: DropDownItemProps) {
  return (
    <DropdownMenu.Item
      className={`rounded-md hover:bg-gray-50 outline-none ${className}`}
    >
      {children}
    </DropdownMenu.Item>
  );
}
