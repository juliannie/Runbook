import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name || undefined,
    role: session.user.role || "member",
  };
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
}

export async function requireRole(
  requiredRole: "admin" | "member"
): Promise<SessionUser> {
  const user = await requireAuth();

  if (requiredRole === "admin" && user.role !== "admin") {
    throw new Error("Insufficient permissions");
  }

  return user;
}
