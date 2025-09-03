import { Sparkles } from "lucide-react";

export function LogosMarquee() {
  return (
    <section className="border-y bg-white/40 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 sm:px-6 lg:px-8">
        {[
          "Reliable scheduling",
          "Audit‑ready history",
          "Autosave",
          "Prisma + Next.js",
          "Holiday‑ready",
        ].map((t) => (
          <div key={t} className="flex items-center gap-2 text-slate-500">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
