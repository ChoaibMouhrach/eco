import React from "react";
import { cva } from "class-variance-authority";
import Link from "next/link";

const button = cva(
  "px-4 py-2 text-center rounded-md font-semibold tracking-wide transition duration-100",
  {
    variants: {
      variation: {
        default: ["bg-gray-900 text-white hover:bg-gray-700"],
        outlined: ["border border-gray-300 hover:bg-gray-100"],
        text: ["hover:bg-gray-100"],
      },
    },
    defaultVariants: {
      variation: "default",
    },
  }
);

interface ButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variation?: "default" | "outlined" | "text";
  href?: string;
}

const Button = ({
  href,
  className,
  variation,
  children,
  ...props
}: ButtonInterface) => {
  if (href) {
    return (
      <Link href={href} className={button({ variation, className })} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={button({ variation, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
