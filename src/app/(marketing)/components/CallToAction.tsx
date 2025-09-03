import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-2">
        <div className="grid items-center gap-6 p-6 sm:grid-cols-2 sm:p-10">
          <div>
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Start with your real tasks
            </h3>
            <p className="mt-2 text-slate-600">
              Import or add tasks in minutes. See today's list immediately—then
              assign, comment, and complete with autosave.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/todo">Open Todo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tasks">Open Task DB</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="mb-2 text-sm font-medium text-slate-600">
                What you get
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />{" "}
                  Deterministic due‑today list
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Autosave
                  + Audit trail
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />{" "}
                  Mobile‑ready tables
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Your
                  data, your DB
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
