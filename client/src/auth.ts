import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { ROUTE } from '@/constants';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const {
  handlers: { GET, POST },
  signIn,
  auth,
} = NextAuth({
  pages: {
    signIn: ROUTE.SIGN_IN,
    error: ROUTE.ERROR,
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        return session;
      }
    },
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
