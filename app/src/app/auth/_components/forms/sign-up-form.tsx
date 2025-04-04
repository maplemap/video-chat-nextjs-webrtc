'use client';

import { Separator } from '@radix-ui/react-separator';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlineErrorOutline } from 'react-icons/md';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Route } from '@/../routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignUp } from '@/hooks/mutations/use-sign-up';
import { SignUpFields, SignUpValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleButton, GithubButton } from '../buttons';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    resolver: zodResolver(SignUpValidationSchema),
  });
  const { mutateAsync, reset, isIdle, isPending, isSuccess } = useSignUp();
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const callbackURL = searchParams?.get('callbackUrl') ?? Route.MAIN;
  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        if (res.success) {
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: callbackURL,
          });
          toast.success(res.success);
        }
        if (res.error) {
          toast.error(res.error);
          reset();
          setError(res.error);
        }
      },
    });
  };
  return (
    <div className='flex w-full grow items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='h-full w-full min-w-[350px] bg-light-primary p-5 dark:bg-dark-primary sm:h-fit sm:w-fit'
      >
        <h1 className='mb-5 text-center text-2xl font-bold'>Sign up</h1>
        <div className='mt-3'>
          <div>
            <Input {...register('email')} placeholder='Email' />
            <span className='relative -top-[2px] ml-2 text-sm text-red-500'>
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input
              {...register('name')}
              placeholder='Name'
              autoComplete='name'
            />
            <span className='relative -top-[2px] ml-2 text-sm text-red-500'>
              {errors.name?.message}
            </span>
          </div>
          <div>
            <Input
              {...register('password')}
              type='password'
              placeholder='Password'
            />
            <span className='relative -top-[2px] ml-2 text-sm text-red-500'>
              {errors.password?.message}
            </span>
          </div>
        </div>
        <Button
          disabled={isPending || isSuccess}
          type='submit'
          className='w-full'
        >
          {isIdle && 'Create account'}
          {isPending && 'Creating your account'}
          {isSuccess && 'Account created successfully'}
        </Button>
        {error && (
          <div className='mt-5 flex w-full items-center justify-center gap-x-4 rounded-lg bg-red-500 px-3 py-2 text-center text-white'>
            <MdOutlineErrorOutline className='h-6 w-6' />
            {error}
          </div>
        )}
        <Separator className='my-5' />
        <div className='space-y-2'>
          <GoogleButton callbackUrl={callbackURL} />
          <GithubButton callbackUrl={callbackURL} />
        </div>
        <div className='mt-5 text-md text-secondary'>
          Have an account already?
          <Link href={Route.SIGN_IN} className='cursor-pointer text-blue-500'>
            &nbsp;Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
