'use server';

import { db } from '@/lib/db';
import { generateCode } from '@/lib/utils';
import {
  CreateMeetingFields,
  CreateMeetingValidationSchema,
} from '@/types/forms';
import { auth } from '../../../auth';

export default async function createMeeting(data: CreateMeetingFields) {
  const session = await auth();
  if (!session) {
    return { error: 'Forbidden !' };
  }
  const validationRes = CreateMeetingValidationSchema.safeParse(data);
  if (!validationRes.success) {
    return { error: 'Invalid name !' };
  }

  const meeting = await db.meeting.create({
    data: {
      name: validationRes.data.name,
      code: generateCode(),
      ownerId: session.user.id,
    },
  });

  return { success: meeting };
}
