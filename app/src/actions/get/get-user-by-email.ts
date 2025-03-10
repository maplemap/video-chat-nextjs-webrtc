'use server';

import { db } from '@/lib/db';

export default async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return null;
  }
}
