import { Card, CardContent } from "@/components/ui/card";

export function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Loved by operations teams
        </h2>
        <span className="text-sm text-slate-500">Quotes from real users</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            quote:
              "Runbook replaced our spreadsheet ritual. The last‑business‑day logic just works.",
            author: "Head of Ops, Asset Manager",
          },
          {
            quote:
              "Auditors finally stopped asking us to reconstruct who did what. It's in TaskOccurrence.",
            author: "Controller, FinTech",
          },
          {
            quote:
              "Autosave means we don't lose updates when laptops sleep between checks.",
            author: "COO, Family Office",
          },
        ].map((t, i) => (
          <Card key={i}>
            <CardContent className="p-6 text-slate-700">
              <p className="text-pretty">"{t.quote}"</p>
              <p className="mt-4 text-sm text-slate-500">{t.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
