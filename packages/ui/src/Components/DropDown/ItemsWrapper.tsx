import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropDownItemsWrapperProps {
  children: React.ReactNode;
}

export function DropDownItemsWrapper({ children }: DropDownItemsWrapperProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="bg-white drop-shadow-sm p-2 border border-stone-300 rounded-md flex flex-col gap-1">
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
