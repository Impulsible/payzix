import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const encoder = new TextEncoder();

const PROTECTED_PREFIXES = ["/app"];
const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password"];

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("payzix_at")?.value;
  if (!token) return false;
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, encoder.encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = await isAuthenticated(req);

  // If hitting a protected route without auth → login
  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) && !authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If authed and hitting auth pages → dashboard
  if (authed && AUTH_PAGES.some((p) => pathname === p)) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup", "/forgot-password", "/reset-password"],
};