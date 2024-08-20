"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
type Props = {
  callbackUrl?: string;
};
export default function GithubButton({ callbackUrl }: Props) {
  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-x-3 rounded-xl bg-slate-100 px-16 py-5 dark:bg-slate-800"
      onClick={() => signIn("github", { callbackUrl })}
    >
      Continue with github <FaGithub className="h-6 w-6" />
    </div>
  );
}
