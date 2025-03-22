'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

type Props = {
  callbackUrl?: string;
};
export default function GoogleButton({ callbackUrl }: Props) {
  return (
    <div
      className='flex cursor-pointer items-center justify-center gap-x-3 bg-slate-100 px-16 py-3 text-md dark:bg-slate-800'
      onClick={() => signIn('google', { callbackUrl })}
    >
      Continue with google <FcGoogle className='h-5 w-5 filter grayscale' />
    </div>
  );
}
