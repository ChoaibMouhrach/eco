import React from "react";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { ImSpinner8 } from "react-icons/im";
import { IconType } from "react-icons";

const button = cva(
  "px-4 py-2 flex items-center justify-center gap-3 text-center rounded-md font-semibold tracking-wide transition duration-200",
  {
    variants: {
      variation: {
        default: ["text-white"],
        outlined: ["border border-gray-300 bg-transparent hover:bg-gray-100"],
        text: ["hover:bg-gray-100"],
      },
      color: {
        default: ["bg-gray-900 hover:bg-gray-700"],
        danger: ["bg-red-600 hover:bg-red-500"],
        success: ["bg-green-600 hover:bg-green-500"],
      },
    },
    compoundVariants: [
      {
        variation: "text",
        color: "default",
        className: "bg-transparent hover:!bg-gray-100",
      },
      {
        variation: "text",
        color: "danger",
        className: "bg-transparent hover:bg-red-100 text-red-700 ",
      },
      {
        variation: "text",
        color: "success",
        className: "text-green-700 bg-transparent hover:bg-green-100",
      },
      {
        variation: "outlined",
        color: "default",
        className: "hover:!bg-gray-100",
      },
    ],
    defaultVariants: {
      variation: "default",
      color: "default",
    },
  }
);

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variation?: "default" | "outlined" | "text";
  color?: "default" | "danger" | "success";
  href?: string;
  iconClassName?: string;
  state?: "loading";
  Icon?: IconType;
}

const Button = ({
  href,
  className,
  variation,
  children,
  color,
  state,
  iconClassName,
  Icon,
  ...props
}: ButtonInterface) => {
  if (href) {
    return (
      <Link
        href={href}
        className={button({ variation, color, className })}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="submit"
      className={button({ variation, color, className })}
      {...props}
    >
      {state === "loading" && (
        <ImSpinner8 className={`w-4 h-4 fill-gray-100 animate-spin`} />
      )}
      {Icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
