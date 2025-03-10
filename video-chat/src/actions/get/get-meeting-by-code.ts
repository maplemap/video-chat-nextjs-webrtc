'use server';

import { db } from '@/lib/db';
import { Code } from '@/types';

export default async function getMeetingByCode(code: Code) {
  try {
    return await db.meeting.findUnique({ where: { code } });
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return null;
  }
}
