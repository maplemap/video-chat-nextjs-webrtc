import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateCode = (code: string) => {
  const allowChars = /^[0-9A-Za-z_]{18}$/;
  return allowChars.test(code);
};
