'use client';

import { FcGoogle } from 'react-icons/fc';

type Props = {
  callbackUrl?: string;
};

export function GoogleButton({ callbackUrl }: Props) {
  return (
    <div className="px-15 flex cursor-pointer items-center justify-center gap-x-3 rounded-xl bg-slate-100 py-5 dark:bg-slate-800">
      Continue with Github <FcGoogle className="h-6 w-6" />
    </div>
  );
}
