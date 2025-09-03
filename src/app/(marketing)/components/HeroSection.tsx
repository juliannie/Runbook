"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Calendar,
  Clock3,
  History,
  PlayCircle,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 rounded-full bg-violet-200 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Never miss a working‑day task again.
          </motion.h1>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-7 text-slate-600">
            Runbook turns complex schedules into a clear, live Todo list—daily,
            weekly, monthly, or the 5th business day of a quarter. It autosaves
            updates, preserves history, and scales with your team.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/todo">
                <PlayCircle className="mr-2 h-5 w-5" />
                Open Todo
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">Read the Docs</Link>
            </Button>
            <span className="text-sm text-slate-500">
              No setup required • Works on iPhone & iPad
            </span>
          </div>
          <ul className="mt-6 grid max-w-xl grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Business‑day
              aware engine
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Live
              autosave with audit trail
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Negative
              indexes (e.g., last biz day)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Multi‑user
              RBAC (Auth‑ready)
            </li>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative"
        >
          <Card className="mx-auto max-w-lg shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium text-slate-600">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-white">
                  RB
                </span>
                Today's Todo (preview)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                {
                  name: "NAV Reconciliation",
                  meta: "Monthly • 5th business day",
                  icon: <Calendar className="h-4 w-4" />,
                },
                {
                  name: "Funding Check",
                  meta: "Daily • business days",
                  icon: <Clock3 className="h-4 w-4" />,
                },
                {
                  name: "Quarter Close Pack",
                  meta: "Quarterly • −3rd business day",
                  icon: <History className="h-4 w-4" />,
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-slate-500">{t.icon}</div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.meta}</div>
                    </div>
                  </div>
                  <Badge variant="outline">pending</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
