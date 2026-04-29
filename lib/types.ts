export type AttendanceStatus = "yes" | "no" | "maybe";
export type AttendanceDays = "all_days" | "wedding_day_only" | "not_sure_yet";

export type RsvpInput = {
  fullName: string;
  attendance: AttendanceStatus;
  country: string;
  guests: number;
  message?: string;
  phoneNumber?: string;
  questions?: string;
  attendanceDays: AttendanceDays;
};

export type RsvpRow = {
  id: string;
  full_name: string;
  attendance: AttendanceStatus;
  country: string;
  guests: number;
  message: string | null;
  phone_number: string | null;
  questions: string | null;
  attendance_days: AttendanceDays;
  created_at: string;
};

export type DashboardStats = {
  totalResponses: number;
  attendingResponses: number;
  attendingGuests: number;
  notAttendingGuests: number;
  notSureGuests: number;
  allDaysGuests: number;
  weddingDayOnlyGuests: number;
  guestsByCountry: Array<{
    country: string;
    guests: number;
    responses: number;
  }>;
};
