import { redirect } from "next/navigation";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { buildDashboardStats, formatAttendance, formatDate } from "@/lib/utils";
import { fetchRsvps, hasSupabaseConfig } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!hasSupabaseConfig()) {
    redirect("/admin/login?reason=missing-config");
  }

  const rows = await fetchRsvps();
  const stats = buildDashboardStats(rows);

  return (
    <main className="min-h-screen bg-lake-mist px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-[2.5rem] border border-white/40 bg-white/75 p-8 shadow-glow backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-blush-600">Private Dashboard</p>
            <h1 className="mt-4 font-display text-5xl text-stoneink">Wedding Responses</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-stoneink/72">
              A live overview of guest replies, attendance, countries, and messages.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Total responses" value={String(stats.totalResponses)} />
          <StatCard label="Attending replies" value={String(stats.attendingResponses)} />
          <StatCard label="Guests coming" value={String(stats.attendingGuests)} />
          <StatCard label="Guests not coming" value={String(stats.notAttendingGuests)} />
          <StatCard label="Guests not sure" value={String(stats.notSureGuests)} />
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-glow">
            <h2 className="font-display text-3xl text-stoneink">Guests by country</h2>
            <div className="mt-6 space-y-3">
              {stats.guestsByCountry.length ? (
                stats.guestsByCountry.map((item) => (
                  <div
                    key={item.country}
                    className="flex items-center justify-between rounded-2xl border border-stone-100 bg-white/90 px-4 py-3"
                  >
                    <div>
                      <p className="font-display text-xl text-stoneink">{item.country}</p>
                      <p className="text-sm text-stoneink/60">{item.responses} response(s)</p>
                    </div>
                    <p className="text-sm uppercase tracking-[0.2em] text-stoneink/70">
                      {item.guests} guest(s)
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-stoneink/65">No responses yet.</p>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/80 shadow-glow">
            <div className="border-b border-stone-100 px-6 py-5">
              <h2 className="font-display text-3xl text-stoneink">Responses</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-blush-50/80 text-xs uppercase tracking-[0.22em] text-blush-600">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Attendance</th>
                    <th className="px-6 py-4">Country</th>
                    <th className="px-6 py-4">Guests</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length ? (
                    rows.map((row) => (
                      <tr key={row.id} className="border-t border-stone-100 align-top">
                        <td className="px-6 py-5 font-medium text-stoneink">{row.full_name}</td>
                        <td className="px-6 py-5 text-stoneink/75">
                          {formatAttendance(row.attendance)}
                        </td>
                        <td className="px-6 py-5 text-stoneink/75">{row.country}</td>
                        <td className="px-6 py-5 text-stoneink/75">{row.guests}</td>
                        <td className="px-6 py-5 text-stoneink/75">{row.message || "—"}</td>
                        <td className="px-6 py-5 text-stoneink/75">{formatDate(row.created_at)}</td>
                        <td className="px-6 py-5 text-right">
                          <AdminDeleteButton id={row.id} name={row.full_name} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-stoneink/65">
                        No RSVP responses yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-glow">
      <p className="text-xs uppercase tracking-[0.28em] text-blush-600">{label}</p>
      <p className="mt-4 font-display text-5xl text-stoneink">{value}</p>
    </article>
  );
}
