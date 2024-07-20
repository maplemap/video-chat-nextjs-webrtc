'use server';

import { db } from '@/lib/db';
import { Code } from '@/types';

export const getMeetingByCode = async (code: Code) => {
  try {
    return db.meeting.findUnique({ where: { code } });
  } catch (error) {
    return null;
  }
};
