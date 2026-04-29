import { NextResponse } from "next/server";
import { hasSupabaseConfig, saveRsvp } from "@/lib/supabase";
import type { AttendanceStatus, RsvpInput } from "@/lib/types";

const validAttendance = new Set<AttendanceStatus>(["yes", "no", "maybe"]);

export async function POST(request: Request) {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json(
        {
          error:
            "RSVP is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the server.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as Partial<RsvpInput>;
    const error = validateRsvp(body);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await saveRsvp({
      fullName: body.fullName!.trim(),
      attendance: body.attendance!,
      country: body.country!.trim(),
      guests: Number(body.guests),
      message: body.message?.trim() || "",
    });

    return NextResponse.json({
      ok: true,
      message: "Thank you! Your response has been received.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to store your RSVP at the moment.",
      },
      { status: 500 }
    );
  }
}

function validateRsvp(body: Partial<RsvpInput>) {
  if (!body.fullName || body.fullName.trim().length < 2) {
    return "Please enter your full name.";
  }

  if (!body.attendance || !validAttendance.has(body.attendance)) {
    return "Please choose whether you will attend.";
  }

  if (!body.country || body.country.trim().length < 2) {
    return "Please enter your country.";
  }

  const guests = Number(body.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    return "Number of guests must be between 1 and 10.";
  }

  return null;
}
