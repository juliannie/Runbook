// src/auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Augment Session type so session.user.id is available everywhere
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id: string };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Persist users/accounts in your DB, but use JWT cookies for sessions
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  // Google uses AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET from .env.local
  providers: [Google],

  pages: {
    signIn: "/auth/signin", // your custom sign-in page
  },

  callbacks: {
    // Copy DB user.id into the JWT on first sign-in
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    // Expose id on session.user for server/client usage
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
