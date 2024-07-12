import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { ROUTE } from '@/constants';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: ROUTE.SIGN_IN,
    error: ROUTE.ERROR,
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
