'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
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
import { useSignUp } from '@/hooks/mutations/use-sign-up';
import { SignUpFields, SignUpValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignUpForm() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: zodResolver(SignUpValidationSchema),
  });
  const searchParams = useSearchParams();
  const { mutateAsync, reset, isIdle, isPending, isSuccess } = useSignUp();
  const callbackUrl = searchParams.get('callbackUrl') ?? ROUTE.MAIN;

  const onSubmit = async (data: SignUpFields) => {
    const onSuccess = async (res) => {
      if (res.success) {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl,
        });
        toast.success(res.success);
      }

      if (res.error) {
        reset();
        setError(res.error);
        toast.error(res.error);
      }
    };

    await mutateAsync(data, { onSuccess });
  };

  return (
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full min-w-[300px] bg-light-primary p-5 dark:bg-dark-primary sm:h-fit sm:w-fit sm:rounded-2xl"
      >
        <h1 className="mb-5 text-center text-2xl font-extrabold">Sign Up</h1>
        <div className="my-3">
          <div>
            <Input {...register('email')} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input
              {...register('name')}
              placeholder="Name"
              autoComplete="name"
            />
            <span className="ml-5 text-xs text-red-500">
              {errors.name?.message}
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
          {isIdle && 'Create an account'}
          {isPending && 'Create your account'}
          {isSuccess && 'Account was created successfully'}
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
          Have an account already? Please&nbsp;
          <Link href={ROUTE.SIGN_IN} className="cursor-pointer text-blue-500">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
