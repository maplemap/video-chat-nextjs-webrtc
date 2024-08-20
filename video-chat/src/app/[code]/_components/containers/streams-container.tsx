"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ControlPanel } from "../panels";

type Props = {
  children: ReactNode;
  count: number;
};
export default function StreamsContainer({ count, children }: Props) {
  return (
    <div className="h-screen">
      <div
        className={cn(
          "grid h-[90vh] w-full grid-flow-col items-center justify-center gap-3 p-3",
          {
            "grid-cols-1 grid-rows-1": count === 1,
            "grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1":
              count === 2,
            "grid-cols-3 grid-rows-1": count === 3,
            "grid-cols-2 grid-rows-2": count === 4,
            "grid-cols-3 grid-rows-2": count === 5 || count === 6,
            "grid-cols-3 grid-rows-3": count >= 7,
          },
        )}
      >
        {children}
      </div>
      <ControlPanel />
    </div>
  );
}
