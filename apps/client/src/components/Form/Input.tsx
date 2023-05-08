import { cva } from "class-variance-authority";
import { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

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

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variation?: "contained";
  className?: string;
  error?: FieldError;
  containerClassName?: string;
}

const Input = forwardRef(
  (
    { variation, error, containerClassName, className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={`w-full flex flex-col gap-2 ${containerClassName}`}>
        <input
          ref={ref}
          className={input({ variation, className })}
          {...props}
        />
        {error && <p className="text-red-700 text-sm">{error.message}</p>}
      </div>
    );
  }
);

export default Input;
