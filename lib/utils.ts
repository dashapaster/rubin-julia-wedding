import type { AttendanceDays, AttendanceStatus, DashboardStats, RsvpRow } from "@/lib/types";

export function formatAttendance(value: AttendanceStatus) {
  if (value === "yes") {
    return "Yes, I will come";
  }
  if (value === "no") {
    return "No, I can't come";
  }
  return "Not sure yet";
}

export function formatAttendanceDays(value: AttendanceDays) {
  if (value === "all_days") {
    return "All days (September 4-6)";
  }
  if (value === "wedding_day_only") {
    return "Wedding day only (September 5)";
  }
  return "Not sure yet";
}

export function buildDashboardStats(rows: RsvpRow[]): DashboardStats {
  const guestsByCountry = new Map<string, { country: string; guests: number; responses: number }>();

  let attendingResponses = 0;
  let attendingGuests = 0;
  let notAttendingGuests = 0;
  let notSureGuests = 0;
  let allDaysGuests = 0;
  let weddingDayOnlyGuests = 0;

  for (const row of rows) {
    if (row.attendance === "yes") {
      attendingResponses += 1;
      attendingGuests += row.guests;
    } else if (row.attendance === "no") {
      notAttendingGuests += row.guests;
    } else {
      notSureGuests += row.guests;
    }

    if (row.attendance !== "no") {
      if (row.attendance_days === "all_days") {
        allDaysGuests += row.guests;
      } else if (row.attendance_days === "wedding_day_only") {
        weddingDayOnlyGuests += row.guests;
      }
    }

    const current = guestsByCountry.get(row.country) || {
      country: row.country,
      guests: 0,
      responses: 0,
    };

    current.responses += 1;
    if (row.attendance !== "no") {
      current.guests += row.guests;
    }

    guestsByCountry.set(row.country, current);
  }

  return {
    totalResponses: rows.length,
    attendingResponses,
    attendingGuests,
    notAttendingGuests,
    notSureGuests,
    allDaysGuests,
    weddingDayOnlyGuests,
    guestsByCountry: Array.from(guestsByCountry.values()).sort((a, b) => {
      return b.guests - a.guests || a.country.localeCompare(b.country);
    }),
  };
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
