import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import getUserByEmail from '@/actions/get/get-user-by-email';
import { SignInValidationSchema } from '@/types/forms';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validationResult = SignInValidationSchema.safeParse(credentials);
        if (!validationResult.success) {
          return null;
        }
        const { email, password } = validationResult.data;
        const candidate = await getUserByEmail(email);
        if (!candidate || !candidate.password) {
          return null;
        }

        const match = await compare(password, candidate.password);
        if (!match) {
          return null;
        }
        return candidate;
      },
    }),
  ],
} satisfies NextAuthConfig;
