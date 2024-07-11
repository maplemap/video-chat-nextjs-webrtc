import { ReactNode } from 'react';
import Navbar from '@/components/navbar';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
