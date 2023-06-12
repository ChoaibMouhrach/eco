import React, { Ref, forwardRef } from "react";

interface TextAreaProps extends React.ComponentProps<"textarea"> {
  error?: string;
  help?: string;
  title?: string;
}

export const TextArea = forwardRef(
  (
    { error, title, help, className, ...rest }: TextAreaProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {title && <span className="px-1 text-lg font-medium">{title}</span>}
        <div>
          <textarea
            ref={ref}
            className={`border-2 border-stone-300 p-2 translate duration-300 rounded-md w-full outline-none disabled:bg-stone-100 focus:border-stone-900 ${className}`}
            {...rest}
          />

          {(error || help) && (
            <p
              className={`px-1 tracking-wide text-sm ${
                error ? "text-red-600" : "text-gray-500"
              }`}
            >
              {error ?? help}
            </p>
          )}
        </div>
      </div>
    );
  }
);
