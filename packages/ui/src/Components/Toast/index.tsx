import React from "react";
import * as T from "@radix-ui/react-toast";
import { ToastAlert, IAlert } from "./Alert";

export type { IAlert } from "./Alert";

interface IToastProps {
  alerts: IAlert[];
}

export function Toast({ alerts = [] }: IToastProps) {
  return (
    <T.Provider>
      {alerts.map((alert) => (
        <ToastAlert alert={alert} key={Math.random()} />
      ))}
      <T.Viewport className="fixed right-0 bottom-0 p-4 w-full max-w-md gap-4 flex flex-col" />
    </T.Provider>
  );
}
