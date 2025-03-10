import { PrismaClient } from '@prisma/client';

declare global {
  let prisma: PrismaClient | undefined;
}

// @ts-expect-error Should be fixed
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'production') {
  // @ts-expect-error Should be fixed
  globalThis.prisma = db;
}
