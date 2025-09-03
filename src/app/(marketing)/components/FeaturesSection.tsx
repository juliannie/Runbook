import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock3, Database, History, Lock, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Deterministic Scheduling",
      desc: "Business‑day aware engine supports weekly, monthly, quarterly, yearly, including negatives (e.g., −1 = last biz day).",
      icon: Calendar,
    },
    {
      title: "Live Autosave",
      desc: "Edits to status, assignee, and comments persist instantly via idempotent upserts and optimistic UI.",
      icon: Clock3,
    },
    {
      title: "Task History (Audit)",
      desc: "TaskOccurrence table records who did what and when, enabling full traceability and reporting.",
      icon: History,
    },
    {
      title: "Team‑Ready Access",
      desc: "Auth.js + roles keep data scoped per user/org; add SSO when needed without rewrites.",
      icon: Users,
    },
    {
      title: "Own Your Data",
      desc: "Prisma + SQL schema you control. Indexes for today's lookups, easy exports and BI hooks.",
      icon: Database,
    },
    {
      title: "Security by Default",
      desc: "CSRF‑safe server actions, secure cookies, and rate‑limited email magic links.",
      icon: Lock,
    },
  ];

  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Built for production ops
        </h2>
        <Badge variant="secondary">Function over aesthetics</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <f.icon className="h-5 w-5 text-slate-600" />
                {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              {f.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
