import * as T from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const state = {
  success: ["bg-green-600"],
  danger: ["bg-red-600"],
  default: ["bg-stone-800"],
};

const alertCVA = cva(["tracking-wide", "flex", "rounded-md", "py-3", "px-4"], {
  variants: {
    state,
  },
  defaultVariants: {
    state: "default",
  },
});

export interface IAlert {
  id: number;
  state: keyof typeof state;
  title: string;
  description?: string;
}

interface IToastAlertProps {
  alert: IAlert;
}

export function ToastAlert({ alert }: IToastAlertProps) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, []);

  return (
    <T.Root className={alertCVA({ state: alert.state })} open={open}>
      <div className="w-full">
        <T.Title className="text-white font-semibold">{alert.title}</T.Title>
        <T.Description className="text-white">
          {alert.description}
        </T.Description>
      </div>
      <T.Action altText="Unfod" asChild className="text-white text-xl ">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="p-0 flex items-center h-fit my-auto"
        >
          <MdClose className="fill-white" />
        </button>
      </T.Action>
    </T.Root>
  );
}
