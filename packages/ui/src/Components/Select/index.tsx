import * as S from "@radix-ui/react-select";
import React, { Ref, forwardRef } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";

interface SelectProps extends S.SelectProps {
  options: { value: string; name: string }[];
  placeholder: string;
  isLoading: boolean;
  error?: string;
  help?: string;
}

export const Select = forwardRef(
  (
    { help, error, isLoading, placeholder, options, ...rest }: SelectProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div>
        <S.Root {...rest} disabled={isLoading}>
          <S.Trigger className="disabled:bg-stone-100 w-full outline-none focus:border-stone-900 border rounded-md flex p-2 items-center justify-between">
            <S.Value placeholder={isLoading ? "Loading..." : placeholder} />
            <S.Icon>
              <MdOutlineChevronLeft className="-rotate-90" />
            </S.Icon>
          </S.Trigger>
          <S.Portal>
            <S.Content ref={ref}>
              <S.Viewport className="drop-shadow-sm p-2 flex flex-col gap-2 bg-white border border-stone-300 rounded-md">
                {!isLoading &&
                  options.map((option) => (
                    <S.Item
                      key={option.name}
                      value={option.value}
                      className="bg-white cursor-pointer p-2 border hover:!bg-stone-100 outline-none focus:border-stone-900 border-stone-300 rounded-md"
                    >
                      <S.ItemText>{option.name}</S.ItemText>
                    </S.Item>
                  ))}
              </S.Viewport>
            </S.Content>
          </S.Portal>
        </S.Root>

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
    );
  }
);
