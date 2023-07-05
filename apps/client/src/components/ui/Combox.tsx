import { ChangeEvent, forwardRef, useState } from "react";
import { Input } from "./input";

interface ComboxProps extends React.ComponentProps<"input"> {
  children: React.ReactNode;
  onValueChange: (value: string) => any;
  itemCount: number;
}

const Combox = forwardRef(
  (
    { children, onValueChange, itemCount, ...rest }: ComboxProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Input
          {...rest}
          ref={ref}
          placeholder="Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onValueChange(e.target.value)
          }
          onFocus={() => setOpen(true)}
          onBlur={() =>
            setTimeout(() => {
              setOpen(false);
            }, 100)
          }
        />
        <div className="relative pt-2">
          <div
            className={`absolute bg-white drop-shadow-sm rounded-md border w-full p-1 ${
              open ? "" : "hidden"
            }`}
          >
            <ul className="flex flex-col gap-1">
              {!itemCount ? (
                <li className="p-2 w-full text-center text-xs hover:bg-gray-100 rounded-md">
                  Not Found
                </li>
              ) : (
                children
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);

interface ComboxItemProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export function ComboxItem({ children, ...props }: ComboxItemProps) {
  return (
    <li>
      <button
        type="button"
        className="p-2 w-full text-start text-xs hover:bg-gray-100 rounded-md"
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

export default Combox;
