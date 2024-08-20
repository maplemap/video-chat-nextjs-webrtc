"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { LuMoreVertical } from "react-icons/lu";
import { signOut, useSession } from "next-auth/react";
import { initials } from "@/lib/utils";
export default function MyAvatar() {
  const { setTheme, theme } = useTheme();
  const { data } = useSession();
  if (!data) return null;

  console.log(data.user);
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-full cursor-pointer items-center justify-between rounded-full bg-light-secondary p-2 dark:bg-slate-800 md:w-80">
          <div className="flex items-center gap-x-5">
            <Avatar className="border-2 border-white">
              <AvatarImage src={data?.user?.image || ""} />
              <AvatarFallback>
                {initials(data?.user?.name as string)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden font-medium md:block">
              {data?.user?.name}
            </div>
          </div>
          <LuMoreVertical className="mr-3 hidden h-6 w-6 md:block" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex cursor-pointer items-center justify-between gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Switch theme
          <Switch
            defaultChecked={theme === "dark"}
            onCheckedChange={(value) => {
              setTheme(value ? "dark" : "light");
            }}
          />
        </div>
        <div
          className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => signOut()}
        >
          Sign-out
        </div>
      </PopoverContent>
    </Popover>
  );
}
