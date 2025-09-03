"use client";
import { Button } from "@/components/ui/button";

export function ScreenshotsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Looks good on every screen
        </h2>
        <span className="text-sm text-slate-500">iPhone • iPad • Desktop</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-medium text-slate-600">
            Todo (Mobile)
          </div>
          <div className="aspect-[9/16] w-full rounded-xl bg-[linear-gradient(135deg,#f6f8fb,#eef2ff)] p-4">
            <PhoneMock />
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-medium text-slate-600">
            Tasks (Desktop)
          </div>
          <div className="aspect-video w-full rounded-xl bg-[linear-gradient(135deg,#f6f8fb,#eef2ff)] p-4">
            <DesktopMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-3 text-sm">
        <span>Runbook</span>
        <span className="text-slate-400">Today</span>
      </div>
      <div className="flex-1 space-y-3 p-3">
        {["Funding Check", "Cash Ladder", "Client Report"].map((t) => (
          <div key={t} className="rounded-lg border p-3">
            <div className="text-sm font-medium">{t}</div>
            <div className="text-xs text-slate-500">pending • tap to edit</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopMock() {
  return (
    <div className="h-full w-full rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-600">Task Database</div>
        <div className="text-xs text-slate-500">Editable inline • Autosave</div>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Frequency</th>
              <th className="px-3 py-2">Display Days</th>
              <th className="px-3 py-2">Assignee</th>
              <th className="px-3 py-2">Comment</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-2">NAV{i}</td>
                <td className="px-3 py-2">M</td>
                <td className="px-3 py-2">[1,5,-1]</td>
                <td className="px-3 py-2">
                  <span className="rounded bg-slate-100 px-2 py-1">Alice</span>
                </td>
                <td className="px-3 py-2 text-slate-500">
                  Recalc after funding
                </td>
                <td className="px-3 py-2 text-right">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
