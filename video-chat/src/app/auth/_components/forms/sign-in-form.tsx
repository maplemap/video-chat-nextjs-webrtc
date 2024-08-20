"use client";

import { Input } from "@/components/ui/input";
import { SignInFields, SignInValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GithubButton, GoogleButton } from "../buttons";
import { useSearchParams } from "next/navigation";
import { Route } from "@/../routes";
import { useSignIn } from "@/hooks/mutations/use-sign-in";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineErrorOutline } from "react-icons/md";
export default function SignInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
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
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") ?? Route.MAIN;
  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    await mutateAsync(
      { data, callbackURL },
      {
        onSuccess: (res) => {
          if (res?.error) {
            reset();
            resetMutation();
            setError(res.error);
          } else {
            toast.success("Success !");
          }
        },
      },
    );
  };
  return (
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full min-w-[300px] bg-light-primary p-5 dark:bg-dark-primary sm:h-fit sm:w-fit sm:rounded-2xl"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">Sign in</h1>
        <div className="my-3">
          <div>
            <Input {...register("email")} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Email"
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
          {isIdle && "Sign in"}
          {isPending && "Signing you in"}
          {isSuccess && "Signed in successfully"}
        </Button>
        {error && (
          <div className="mt-5 flex w-full items-center justify-center gap-x-4 rounded-lg bg-red-500 px-3 py-2 text-center text-white">
            <MdOutlineErrorOutline className="h-6 w-6" />
            {error}
          </div>
        )}
        <Separator className="my-5" />
        <div className="space-y-2">
          <GoogleButton callbackUrl={callbackURL} />
          <GithubButton callbackUrl={callbackURL} />
        </div>
        <div className="mt-3 text-sm text-secondary">
          {"Don't have an account yet ? "}
          <Link href={Route.SIGN_UP} className="cursor-pointer text-blue-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
