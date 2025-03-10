'use client';

import { signOut, useSession } from 'next-auth/react';
import { LuMoreVertical } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Switch } from '../ui/switch';

export default function MyAvatar() {
  const { setTheme, theme } = useTheme();
  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex h-full w-full max-w-60 cursor-pointer items-center justify-between gap-x-3'>
          <div className='flex w-full items-center gap-x-5 overflow-hidden'>
            <div className='hidden flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium  md:block'>
              {data?.user?.name}
            </div>
          </div>
          <div className='flex-shrink-0'>
            <LuMoreVertical className='mr-3 h-4 w-4' />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex cursor-pointer items-center justify-between gap-x-5 p-2 text-lg duration-200 hover:bg-gray-50 dark:hover:bg-gray-800'>
          Switch theme
          <Switch
            defaultChecked={theme === 'dark'}
            onCheckedChange={(value) => {
              setTheme(value ? 'dark' : 'light');
            }}
          />
        </div>
        <div
          className='flex cursor-pointer items-center gap-x-3 p-2 text-lg duration-200 hover:bg-gray-50 dark:hover:bg-gray-800'
          onClick={() => signOut()}
        >
          Sign-out
        </div>
      </PopoverContent>
    </Popover>
  );
}
