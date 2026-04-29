import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROUTES = ["/admin", "/responses"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtected || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expectedSecret = process.env.ADMIN_SESSION_SECRET;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const session = request.cookies.get("wedding_admin_session")?.value;

  if (!expectedSecret || !expectedPassword) {
    const url = new URL("/admin/login?reason=missing-config", request.url);
    return NextResponse.redirect(url);
  }

  if (session !== expectedSecret) {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/responses/:path*"],
};
