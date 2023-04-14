import { cva } from "class-variance-authority";
import { ForwardedRef, forwardRef } from "react";

const input = cva(
  "w-full py-2 px-3 border transition duration-300 border-gray-300 rounded-md focus:border-gray-900 outline-none",
  {
    variants: {
      variation: {
        contained: ["bg-gray-100"],
      },
    },
  }
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variation?: "contained";
  className?: string;
}

const Input = forwardRef(({ variation, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <input ref={ref} className={input({ variation, className })} {...props} />;
})

export default Input;
