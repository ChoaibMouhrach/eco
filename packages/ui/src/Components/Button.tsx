import { cva } from "class-variance-authority";
import NLink from "next/link";
import React, { Ref, forwardRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// classes
const button = cva(
  [
    "flex",
    "gap-2",
    "items-center",
    "justify-center",
    "py-2",
    "px-3",
    "text-white",
    "rounded-md",
    "font-medium",
    "tracking-wider",
    "transition",
    "duration-300",
  ],
  {
    variants: {
      variant: {
        default: [
          // default classes
        ],
        text: [
          // text classes
        ],
        outlined: ["border-2"],
      },
      color: {
        primary: [
          "bg-stone-900",
          "hover:bg-stone-700",
          "active:bg-stone-500",
          "disabled:bg-stone-500",
        ],
        danger: [
          "bg-red-700",
          "hover:bg-red-600",
          "active:bg-red-500",
          "disabled:bg-red-500",
        ],
        success: [
          "bg-green-700",
          "hover:bg-green-600",
          "active:bg-green-500",
          "disabled:bg-green-500",
        ],
      },
    },

    compoundVariants: [
      {
        variant: "text",
        color: "primary",
        class: [
          "bg-transparent",
          "!text-stone-800",
          "hover:!bg-stone-100",
          "active:!bg-stone-200",
        ],
      },
      {
        variant: "text",
        color: "success",
        class: [
          "bg-transparent",
          "text-green-800",
          "hover:!bg-green-100",
          "active:!bg-green-200",
        ],
      },
      {
        variant: "text",
        color: "danger",
        class: [
          "bg-transparent",
          "text-red-800",
          "hover:!bg-red-100",
          "active:!bg-red-200",
        ],
      },
      {
        variant: "outlined",
        color: "primary",
        class: [
          "bg-transparent",
          "text-stone-800",
          "border-stone-800",
          "hover:!bg-stone-100",
          "active:!bg-stone-200",
        ],
      },
      {
        variant: "outlined",
        color: "danger",
        class: [
          "bg-transparent",
          "text-red-800",
          "border-red-800",
          "hover:!bg-red-100",
          "active:!bg-red-200",
        ],
      },
      {
        variant: "outlined",
        color: "success",
        class: [
          "bg-transparent",
          "text-green-800",
          "border-green-800",
          "hover:!bg-green-100",
          "active:!bg-green-200",
        ],
      },
    ],

    defaultVariants: {
      variant: "default",
      color: "primary",
    },
  }
);

// props interface
type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "text" | "outlined";
  color?: "primary" | "danger" | "success";
  href?: string;
  isLoading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>;

export const Button = forwardRef(
  (
    {
      children,
      isLoading,
      variant,
      href,
      color,
      className,
      ...rest
    }: ButtonProps,
    ref: Ref<HTMLButtonElement> & Ref<HTMLAnchorElement>
  ) => {
    if (href) {
      return (
        <NLink
          className={button({ variant, color, className })}
          {...rest}
          href={href}
          ref={ref}
        >
          {children}
        </NLink>
      );
    }

    return (
      <button
        type="submit"
        disabled={isLoading}
        ref={ref}
        className={button({ variant, color, className })}
        {...rest}
      >
        {children}
        {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
      </button>
    );
  }
);
