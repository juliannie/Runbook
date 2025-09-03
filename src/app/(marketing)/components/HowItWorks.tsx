import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, Clock3, History } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Define tasks",
      body: "Capture frequency and working days (e.g., W:[1] for Monday, M:[1,5,-1]).",
      icon: Calendar,
    },
    {
      title: "Runbook computes due",
      body: "Pure, UTC‑based logic maps your rules to today's actionable list.",
      icon: Clock3,
    },
    {
      title: "Do & record",
      body: "Work the list. Status, assignee, and comments autosave into TaskOccurrence.",
      icon: CheckCircle2,
    },
    {
      title: "Audit & report",
      body: "Search what happened, when, and by whom. Export for compliance.",
      icon: History,
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <s.icon className="h-5 w-5 text-slate-600" />
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              {s.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
