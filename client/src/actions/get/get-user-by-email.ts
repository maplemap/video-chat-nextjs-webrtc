'use server';

import { db } from '@/lib/db';

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (e) {
    return null;
  }
}
