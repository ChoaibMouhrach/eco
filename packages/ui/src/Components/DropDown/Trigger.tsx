import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropDownTriggerProps {
  children: React.ReactNode;
}

export function DropDownTrigger({ children }: DropDownTriggerProps) {
  return (
    <DropdownMenu.Trigger className="outline-none">
      {children}
    </DropdownMenu.Trigger>
  );
}
