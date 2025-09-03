"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white">
            RB
          </span>
          <span className="text-slate-900">Runbook</span>
          <Badge className="ml-2" variant="secondary">
            v1
          </Badge>
        </Link>
        <nav className="hidden items-center gap-6 md:flex text-sm text-slate-600">
          <Link href="#features" className="hover:text-slate-900">
            Features
          </Link>
          <Link href="#how" className="hover:text-slate-900">
            How it works
          </Link>
          <Link href="#faq" className="hover:text-slate-900">
            FAQ
          </Link>
          <Link href="/docs" className="hover:text-slate-900">
            Docs
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="hover:text-slate-900"
          >
            GitHub
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="/todo">Open App</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
