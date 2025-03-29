import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import getUserByEmail from '@/actions/get/get-user-by-email';
import { prisma } from '@/lib/prisma';
import { SignInValidationSchema } from '@/types/forms';
import { PrismaAdapter } from '@auth/prisma-adapter';

export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
        return match ? candidate : null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) {
        return true;
      }

      if (account.provider !== 'credentials') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          const existingAccount = await prisma.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          });

          if (!existingAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state:
                  typeof account.session_state === 'string'
                    ? account.session_state
                    : (account.session_state?.toString() ?? null),
              },
            });
          }
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
