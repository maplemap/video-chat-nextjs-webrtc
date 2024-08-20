"use client";

import { Button } from "@/components/ui/button";
import { SignUpFields, SignUpValidationSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoogleButton, GithubButton } from "../buttons";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Route } from "@/../routes";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(SignUpValidationSchema),
  });
  const { mutateAsync, reset, isIdle, isPending, isSuccess } = useSignUp();
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl") ?? Route.MAIN;
  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        if (res.success) {
          signIn("credentials", {
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
    <div className="flex w-full grow items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full min-w-[300px] bg-light-primary p-5 dark:bg-dark-primary sm:h-fit sm:w-fit sm:rounded-2xl"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">Sign up</h1>
        <div className="my-3">
          <div>
            <Input {...register("email")} placeholder="Email" />
            <span className="ml-5 text-xs text-red-500">
              {errors.email?.message}
            </span>
          </div>
          <div>
            <Input
              {...register("name")}
              placeholder="Name"
              autoComplete="name"
            />
            <span className="ml-5 text-xs text-red-500">
              {errors.name?.message}
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
          {isIdle && "Create account"}
          {isPending && "Creating your account"}
          {isSuccess && "Account created successfully"}
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
          {"Have an account already ? "}
          <Link href={Route.SIGN_IN} className="cursor-pointer text-blue-500">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
