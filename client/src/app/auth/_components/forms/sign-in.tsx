'use client';

import { useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlineErrorOutline } from 'react-icons/md';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { GithubButton, GoogleButton } from '@/app/auth/_components/buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ROUTE } from '@/constants';
import { useSignIn } from '@/hooks/mutations/use-sign-in';
import { SignInFields, SignInValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignInForm() {
  const [error, setError] = useState('');
  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInValidationSchema),
  });
  const {
    mutateAsync,
    reset: resetMutation,
    isIdle,
    isPending,
    isSuccess,
  } = useSignIn();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? ROUTE.MAIN;

  const onSubmit = async (data: SignInFields) => {
    const onSuccess = (res) => {
      if (res?.error) {
        resetForm();
        resetMutation();
        setError(res?.error);
      } else {
        toast.success('Success');
      }
    };

    await mutateAsync({ data, callbackUrl }, { onSuccess });
  };

  return (
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full min-w-[300px] bg-light-primary p-5 dark:bg-dark-primary sm:h-fit sm:w-fit sm:rounded-2xl"
      >
        <h1 className="mb-5 text-center text-2xl font-extrabold">Sign In</h1>
        <div className="my-3">
          <div>
            <Input {...register('email')} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
            />
            <span className="ml-5 text-xs text-red-500">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button
          disabled={isPending || isSuccess}
          type="submit"
          className="w-full"
        >
          {isIdle && 'Sign In'}
          {isPending && 'Sign In process'}
          {isSuccess && 'Signed in successfully'}
        </Button>
        {error && (
          <div className="px3 mt-5 flex w-full items-center justify-center gap-x-4 rounded-lg bg-red-500 py-2 text-center text-white">
            <MdOutlineErrorOutline className="h-6 w-6" />
            {error}
          </div>
        )}
        <Separator className="my-5" />
        <div className="space-y-2">
          <GoogleButton callbackUrl={callbackUrl} />
          <GithubButton callbackUrl={callbackUrl} />
        </div>
        <div className="mt-3 text-sm text-secondary">
          Don't have an account yet? Please&nbsp;
          <Link href={ROUTE.SIGN_UP} className="cursor-pointer text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
