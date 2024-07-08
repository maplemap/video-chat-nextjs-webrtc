import {
  Avatar as ShadCNAvatar,
  AvatarFallback as ShadCNAvatarFallback,
  AvatarImage as ShadCNAvatarImage,
} from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function Avatar() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-full cursor-pointer items-center justify-between rounded-full bg-light-secondary p-2 dark:bg-slate-800 md:w-80">
          <div className="flex items-center gap-x-5">
            <ShadCNAvatar className="border-2 border-white">
              <ShadCNAvatarImage src="https://github.com/shadcn.png" />
              <ShadCNAvatarFallback>CN</ShadCNAvatarFallback>
            </ShadCNAvatar>
            <div className="hidden font-medium md:block">Adam Joseph</div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Switch theme
        </div>
        <div className="flex cursor-pointer items-center gap-x-3 rounded-xl p-2 duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
          Sign-out
        </div>
      </PopoverContent>
    </Popover>
  );
}
