import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password, next } = (await request.json()) as {
    password?: string;
    next?: string;
  };

  const expectedPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!expectedPassword || !sessionSecret) {
    return NextResponse.json(
      {
        error: "Admin access is not configured. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
      },
      { status: 500 }
    );
  }

  if (!password || password !== expectedPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("wedding_admin_session", sessionSecret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  const redirectTo = typeof next === "string" && next.startsWith("/") ? next : "/admin";
  return NextResponse.json({ ok: true, redirectTo });
}
