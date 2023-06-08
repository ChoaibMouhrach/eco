import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
    </div>
  );
}
