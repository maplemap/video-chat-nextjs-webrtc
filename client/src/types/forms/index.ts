import getMeetingByCode from "@/actions/get/get-meeting-by-code";
import { validateCode } from "@/lib/utils";
import { z } from "zod";

export const JoinMeetingValidationSchema = z.object({
  code: z
    .string()
    .refine(validateCode, "Invalid code !")
    .refine(async (code) => {
      const meeting = await getMeetingByCode(code);
      return !!meeting;
    }, "Meeting not found :("),
});
export const CreateMeetingValidationSchema = z.object({
  name: z
    .string()
    .max(110, "Max length is 110 chars")
    .min(2, "Min length is 2 chars"),
});
export const SignUpValidationSchema = z.object({
  email: z.string().email("Invalid email !"),
  name: z
    .string()
    .min(1, "Name is required !")
    .max(100, "Max length is 100 chars"),
  password: z
    .string()
    .min(5, "Min length is 5 chars !")
    .max(20, "Max length is 20 chars"),
});
export const SignInValidationSchema = z.object({
  email: z.string().email("Invalid email !"),
  password: z
    .string()
    .min(5, "Min length is 5 chars !")
    .max(20, "Max length is 20 chars"),
});

export type SignUpFields = z.infer<typeof SignUpValidationSchema>;
export type SignInFields = z.infer<typeof SignInValidationSchema>;
export type JoinMeetingFields = z.infer<typeof JoinMeetingValidationSchema>;
export type CreateMeetingFields = z.infer<typeof CreateMeetingValidationSchema>;
