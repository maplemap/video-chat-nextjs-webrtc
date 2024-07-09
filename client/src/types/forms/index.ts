import { z } from 'zod';
import { validateCode } from '@/lib/utils';

export const JoinMeetingValidationSchema = z.object({
  code: z.string().refine(validateCode, 'Invalid code'),
});
export const CreateMeetingValidationSchema = z.object({
  name: z
    .string()
    .max(110, 'Max length is 110 chars')
    .min(2, 'Min length is 2 chars'),
});

export type JoinMeetingFields = z.infer<typeof JoinMeetingValidationSchema>;
export type CreateMeetingFields = z.infer<typeof CreateMeetingValidationSchema>;
