'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { GithubButton, GoogleButton } from '@/app/auth/_components/buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SignInFields, SignInValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignInForm() {
  const {
    register,
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

  const onSubmit = async (data: SignInFields) => {
    console.log(data);
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
            <Input {...register('password')} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <Separator className="my-5" />
        <div className="space-y-2">
          <GoogleButton />
          <GithubButton />
        </div>
        <div className="mt-3 text-sm text-secondary">
          Don't have an account yet? Please&nbsp;
          <Link href="/auth/sign-up" className="cursor-pointer text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
