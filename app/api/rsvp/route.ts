import { NextResponse } from "next/server";
import { hasSupabaseConfig, saveRsvp } from "@/lib/supabase";
import type { AttendanceDays, AttendanceStatus, RsvpInput } from "@/lib/types";

const validAttendance = new Set<AttendanceStatus>(["yes", "no", "maybe"]);
const validAttendanceDays = new Set<AttendanceDays>([
  "all_days",
  "wedding_day_only",
  "not_sure_yet",
]);
const phonePattern = /^[+\d\s()-]+$/;

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
      phoneNumber: body.phoneNumber?.trim() || "",
      questions: body.questions?.trim() || "",
      attendanceDays: body.attendanceDays!,
    });

    console.info("[RSVP API] Submission saved successfully", {
      fullName: body.fullName,
      country: body.country,
      attendance: body.attendance,
      attendanceDays: body.attendanceDays,
    });

    return NextResponse.json({
      ok: true,
      message: "Thank you! Your response has been received.",
    });
  } catch (error) {
    console.error("[RSVP API] Submission failed", error);
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

  if (body.phoneNumber && (!phonePattern.test(body.phoneNumber.trim()) || body.phoneNumber.trim().length < 5)) {
    return "Please enter a valid phone number.";
  }

  const guests = Number(body.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    return "Number of guests must be between 1 and 10.";
  }

  if (!body.attendanceDays || !validAttendanceDays.has(body.attendanceDays)) {
    return "Please choose which days you will attend.";
  }

  return null;
}
