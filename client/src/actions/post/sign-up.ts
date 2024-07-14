'use server';

import { hash } from 'bcryptjs';
import { getUserByEmail } from '@/actions/get/get-user-by-email';
import { db } from '@/lib/db';
import { SignUpFields, SignUpValidationSchema } from '@/types/forms';

const SALT = 5;

export async function signUp(data: SignUpFields) {
  const validationResult = SignUpValidationSchema.safeParse(data);

  if (!validationResult.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, name, password } = validationResult.data;
  const candidate = await getUserByEmail(email);

  if (candidate) {
    return { error: 'Email already taken!' };
  }

  const hashedPassword = await hash(password, SALT);
  await db.user.create({ data: { email, name, password: hashedPassword } });

  return { success: 'User created successfully!' };
}
