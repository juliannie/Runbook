// Server component: shows basic profile info
import { auth } from "@/auth";
import Image from "next/image";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">Account Settings</h1>

      {!user ? (
        <p className="text-sm text-muted-foreground">You are not signed in.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[160px_1fr] items-start">
          <div className="flex items-center justify-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Profile"}
                width={120}
                height={120}
                className="rounded-full ring-1 ring-border"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center text-2xl">
                {(user.name?.[0] ?? user.email?.[0] ?? "U").toUpperCase()}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div>
              <div className="text-sm text-muted-foreground">Name</div>
              <div className="font-medium">{user.name ?? "—"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <div className="font-medium">{user.email ?? "—"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
