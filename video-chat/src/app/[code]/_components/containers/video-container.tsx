"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, initials } from "@/lib/utils";
import hark from "hark";
import { useEffect } from "react";
import { LuMic, LuMicOff } from "react-icons/lu";
import { useToggle } from "usehooks-ts";
type Props = {
  visible: boolean;
  image: string;
  name?: string;
  stream: MediaStream;
  children: React.ReactNode;
};
export default function VideoContainer({
  visible,
  image,
  name = '',
  stream,
  children,
}: Props) {
  const [speaking, toggle] = useToggle(false);

  useEffect(() => {
    let speechEvents = hark(stream, {});
    speechEvents.on("speaking", toggle);
    speechEvents.on("stopped_speaking", toggle);
    return () => {
      speechEvents.stop();
    };
  }, [stream, toggle]);

  const avatar = (
    <div className="flex h-full w-full items-center justify-center bg-light-primary dark:bg-dark-primary ">
      <Avatar className="h-20 w-20 md:h-24 md:w-24">
        <AvatarImage src={undefined} />
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    </div>
  );

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-xl border border-transparent",
        {
          "border-blue-500": speaking,
        },
      )}
    >
      <div
        className={cn("h-full", {
          hidden: !visible,
        })}
      >
        {children}
      </div>
      {!visible && avatar}
    </div>
  );
}
