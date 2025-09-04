// src/lib/session.ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

/** Minimal shape you can rely on across the app */
export type SessionUser = {
  id: string;
  email: string | null;
  name?: string | null;
  role?: string | null; // present if you add it to the session callback
};

/** Returns the current user or null (no throw, no redirect). */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  const u = session?.user as SessionUser | undefined;

  if (!u?.id) return null;

  // Provide safe fallbacks
  return {
    id: u.id,
    email: u.email ?? null,
    name: u.name ?? null,
    role: u.role ?? null,
  };
}

/**
 * Ensures an authenticated user in server contexts.
 * If unauthenticated, redirects to sign-in (optionally with a callbackUrl).
 */
export async function requireAuth(callbackUrl?: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    const target = callbackUrl ?? "/todo";
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent(target)}`);
  }
  return user;
}
