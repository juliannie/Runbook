import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white">
              RB
            </span>
            <span className="text-slate-700">Runbook</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <Link href="/docs" className="hover:text-slate-700">
              Docs
            </Link>
            <Link href="/privacy" className="hover:text-slate-700">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-700">
              Terms
            </Link>
            <span>© {new Date().getFullYear()} Runbook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
