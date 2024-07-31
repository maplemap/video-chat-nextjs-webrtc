"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, initials } from "@/lib/utils";
import { LuMic, LuMicOff } from "react-icons/lu";
type Props = {
  muted: boolean;
  visible: boolean;
  image: string;
  name: string;
  stream: MediaStream;
  children: React.ReactNode;
};
export default function VideoContainer({
  muted,
  visible,
  image,
  name,
  stream,
  children,
}: Props) {
  return (
    <div className="relative h-full overflow-hidden rounded-xl">
      <div
        className={cn("h-full", {
          hidden: !visible,
        })}
      >
        {children}
      </div>
      {!visible && (
        <div className="flex h-full w-full items-center justify-center bg-light-primary dark:bg-dark-primary ">
          <Avatar className="h-20 w-20 md:h-24 md:w-24">
            <AvatarImage src={image} />
            <AvatarFallback>{initials(name)}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <p className="absolute bottom-3 left-4 select-none rounded-full bg-black/20 p-2 text-md font-medium text-white backdrop-blur-lg dark:bg-gray-300/20">
        {name}
      </p>
      <div className="absolute right-3 top-3">
        {muted ? (
          <LuMicOff className="h-6 w-6" />
        ) : (
          <LuMic className="h-6 w-6" />
        )}
      </div>
    </div>
  );
}
