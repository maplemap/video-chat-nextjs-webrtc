'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
