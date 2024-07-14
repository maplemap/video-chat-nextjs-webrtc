'use server';

import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/actions/get/get-user-by-email';
import { signIn as authSignIn } from '@/auth';
import { SignInFields, SignInValidationSchema } from '@/types/forms';

type Params = {
  data: SignInFields;
  callbackUrl?: string;
};

export async function signIn({ data, callbackUrl }: Params) {
  const validationResult = SignInValidationSchema.safeParse(data);

  if (!validationResult.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validationResult.data;
  const candidate = await getUserByEmail(email);

  if (!candidate || !candidate.password || !candidate.email) {
    return { error: 'User not found' };
  }

  console.log('callbackUrl', callbackUrl);

  try {
    await authSignIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong :(' };
      }
    }

    throw error;
  }
}
