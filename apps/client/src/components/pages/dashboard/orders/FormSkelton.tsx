import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function FormSkelton() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col lg:flex-row gap-4">
        <Skeleton className="w-[200px] h-9" />
        <Skeleton className="w-[200px] h-9" />
      </div>

      <Separator />

      <div className="flex flex-col gap-2 border border-300">
        {[...Array(5)].map((_, i) => (
          <Fragment key={Math.random()}>
            <div className="grid grid-cols-8 gap-2 p-3">
              {[...Array(8)].map(() => (
                <Skeleton key={Math.random()} className="h-8" />
              ))}
            </div>
            {i + 1 !== 5 && <div className="h-[1px] bg-gray-300" />}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-between gap-4">
        <Skeleton className="w-[200px] h-9" />
        <div className="flex items-center gap-4">
          <Skeleton className="w-[100px] h-9" />
          <Skeleton className="w-[100px] h-9" />
        </div>
      </div>

      <Skeleton className="w-[100px] h-9" />
    </div>
  );
}
