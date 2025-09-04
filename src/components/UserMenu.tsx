"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function initials(name?: string | null, email?: string | null) {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(/\s+/);
    return parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
  }
  if (email) return email[0]?.toUpperCase() ?? "U";
  return "U";
}

export function UserMenu() {
  const { data: session, status } = useSession();
  const user = session?.user;

  // In (app) layout users should be authed, but guard anyway
  if (status === "loading") {
    return (
      <Button variant="outline" className="min-h-[40px]" disabled>
        …
      </Button>
    );
  }

  if (!user) {
    return (
      <Button asChild variant="outline" className="min-h-[40px]">
        <Link href="/auth/signin">Sign in</Link>
      </Button>
    );
  }

  const userName = user.name ?? "User";
  const userEmail = user.email ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="User menu"
        >
          <Avatar className="h-9 w-9">
            {/* Use AvatarImage for proper sizing; Next/Image is fine too but Avatar handles it */}
            <AvatarImage src={user.image ?? ""} alt={userName} />
            <AvatarFallback>{initials(user.name, user.email)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image ?? ""} alt={userName} />
              <AvatarFallback>{initials(user.name, user.email)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate font-medium">{userName}</div>
              <div className="truncate text-xs text-muted-foreground">
                {userEmail}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          className="text-red-600 focus:text-red-700"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
