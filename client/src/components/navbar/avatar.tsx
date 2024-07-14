'use client';

import { signOut, useSession } from 'next-auth/react';
import { LuMoreVertical } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';

const userNameInitials = (fullName: string) =>
  fullName
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

export default function MyAvatar() {
  const { setTheme, theme } = useTheme();
  const { data } = useSession();
  const userImage = data?.user?.image ?? '';
  const userFullName = data?.user?.name ?? '';

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-full cursor-pointer items-center justify-between rounded-full bg-light-secondary p-2 dark:bg-slate-800 md:w-80">
          <div className="flex items-center gap-x-5">
            <Avatar className="border-2 border-white">
              <AvatarImage src={userImage} />
              <AvatarFallback>{userNameInitials(userFullName)}</AvatarFallback>
            </Avatar>
            <div className="hidden font-medium md:block">{userFullName}</div>
          </div>
          <LuMoreVertical className="hidden h-6 w-6 md:block" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex cursor-pointer items-center justify-between gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Switch theme
          <Switch
            defaultChecked={theme === 'dark'}
            onCheckedChange={(value) => {
              setTheme(value ? 'dark' : 'light');
            }}
          />
        </div>
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Sign-out
        </div>
      </PopoverContent>
    </Popover>
  );
}
