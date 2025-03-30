import NextAuth from 'next-auth';
import authConfig from '@/../auth.config';

export const {
  auth,
  signIn,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});
