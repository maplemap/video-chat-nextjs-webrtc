"use server";

import { db } from "@/lib/db";
import { Code } from "@/types";

export default async function getMeetingByCode(code: Code) {
  try {
    const meeting = await db.meeting.findUnique({ where: { code } });
    return meeting;
  } catch (error) {
    return null;
  }
}
