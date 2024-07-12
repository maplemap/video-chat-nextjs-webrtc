'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { GithubButton, GoogleButton } from '@/app/auth/_components/buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ROUTE } from '@/constants';
import { SignUpFields, SignUpValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignUpForm() {
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
  const callbackUrl = searchParams.get('callbackUrl') ?? ROUTE.MAIN;

  const onSubmit = async (data: SignUpFields) => {
    console.log(data);
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
            <Input {...register('password')} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
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
