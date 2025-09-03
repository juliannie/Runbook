import { ReactNode } from "react";
import Navigation from "@/components/Navigation";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100svh]">
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>
  );
}
