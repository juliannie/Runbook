import { ReactNode } from "react";
import { MarketingHeader } from "./components/MarketingHeader";
import { MarketingFooter } from "./components/MarketingFooter";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
