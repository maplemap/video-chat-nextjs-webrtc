import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers';
import QueryProvider from '@/providers/query-provider';
import { auth } from '../../auth';
import './globals.css';

const font = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Video Chat on Next.js',
  description: 'Video Chat on Next.js',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <html lang='en' suppressHydrationWarning>
          <body className={font.className}>
            <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
