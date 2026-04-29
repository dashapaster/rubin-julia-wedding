export type AttendanceStatus = "yes" | "no" | "maybe";

export type RsvpInput = {
  fullName: string;
  attendance: AttendanceStatus;
  country: string;
  guests: number;
  message?: string;
};

export type RsvpRow = {
  id: string;
  full_name: string;
  attendance: AttendanceStatus;
  country: string;
  guests: number;
  message: string | null;
  created_at: string;
};

export type DashboardStats = {
  totalResponses: number;
  attendingResponses: number;
  attendingGuests: number;
  notAttendingGuests: number;
  notSureGuests: number;
  guestsByCountry: Array<{
    country: string;
    guests: number;
    responses: number;
  }>;
};
