import Navbar from "@/components/navbar";
import { ReactNode } from "react";

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
