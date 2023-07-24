import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

export interface ComboxUiItem {
  value: string;
  label: string;
}

interface ComboxUiProps {
  placeholder: string;
  items: ComboxUiItem[];
  onValueChange: (value: string) => any;
  onSearchChange?: (value: string) => any;
  defaultValue?: string;
}

export function ComboxUi({
  placeholder,
  onSearchChange,
  items,
  onValueChange,
  defaultValue,
}: ComboxUiProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : defaultValue ?? placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            onValueChange={onSearchChange}
            placeholder={placeholder}
            className="h-9"
          />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={(currentValue) => {
                  const selectedValue =
                    currentValue === value
                      ? ""
                      : items.find(
                          (item) =>
                            item.label.toLocaleLowerCase() === currentValue
                        )!.value;
                  setValue(selectedValue);
                  setOpen(false);
                  if (onValueChange) onValueChange(selectedValue);
                }}
              >
                {item.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
