import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export * from "./Item";
export * from "./ItemsWrapper";
export * from "./Trigger";
export * from "./Separator";

interface DropDownProps {
  children: React.ReactNode;
}

export function DropDown({ children }: DropDownProps) {
  return (
    <div>
      <DropdownMenu.Root>{children}</DropdownMenu.Root>
    </div>
  );
}
