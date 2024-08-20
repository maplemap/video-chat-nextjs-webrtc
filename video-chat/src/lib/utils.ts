import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCode() {
  return nanoid(18);
}

export function validateCode(code: string) {
  const allowedChars = /^[0-9A-Za-z_\-]{18}$/;
  return allowedChars.test(code);
}

export function initials(fullname: string) {
  return fullname
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}
