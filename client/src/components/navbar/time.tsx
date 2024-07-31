"use client";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

type Props = {
  className?: string;
};
export default function Time({ className }: Props) {
  const [time, setTime] = useState<string>("");
  useInterval(() => {
    setTime(dayjs().format("HH:mm | ddd, MMM D"));
  }, 1000);
  return (
    <span className={cn("text-md sm:text-lg md:text-xl", className)}>
      {time}
    </span>
  );
}
