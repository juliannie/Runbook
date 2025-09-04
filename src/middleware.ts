import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Only these are public. Everything else requires auth.
function isPublicPath(pathname: string) {
  if (pathname === "/") return true; // landing page
  if (pathname.startsWith("/auth")) return true; // sign-in, callbacks, etc.
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Always allow Next internals & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Allow Auth.js API endpoints (login, callback, etc.)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow public routes
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Protect everything else (covers all current & future app pages and APIs)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = "/auth/signin";
    signInUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Match *all* URLs except Next internals/static; we handle allow/deny above.
// This guarantees future pages (including under `(app)`) are protected by default.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
