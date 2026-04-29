import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteRsvp, hasSupabaseConfig } from "@/lib/supabase";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const cookieStore = await cookies();
  const session = cookieStore.get("wedding_admin_session")?.value;

  if (!sessionSecret || !expectedPassword) {
    return NextResponse.json(
      { error: "Admin access is not configured. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 500 }
    );
  }

  if (session !== sessionSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 }
    );
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing RSVP id." }, { status: 400 });
  }

  try {
    await deleteRsvp(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete RSVP." },
      { status: 500 }
    );
  }
}
