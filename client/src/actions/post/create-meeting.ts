'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { generateMeetingCode } from '@/lib/utils';
import {
  CreateMeetingFields,
  CreateMeetingValidationSchema,
} from '@/types/forms';

export const createMeeting = async (data: CreateMeetingFields) => {
  const session = await auth();
  if (!session) {
    return { error: 'Forbidden' };
  }

  const validationResult = CreateMeetingValidationSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: 'Invalid data' };
  }

  const meeting = await db.meeting.create({
    data: {
      ownerId: session.user.id,
      code: generateMeetingCode(),
      name: validationResult.data.name,
    },
  });

  return { success: meeting };
};
