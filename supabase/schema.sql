create table if not exists public.wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  attendance text not null check (attendance in ('yes', 'no', 'maybe')),
  country text not null,
  guests integer not null check (guests >= 1 and guests <= 10),
  message text,
  phone_number text,
  questions text,
  attendance_days text not null check (attendance_days in ('all_days', 'wedding_day_only', 'not_sure_yet')) default 'not_sure_yet',
  created_at timestamptz not null default now()
);

alter table public.wedding_rsvps
  add column if not exists phone_number text;

alter table public.wedding_rsvps
  add column if not exists questions text;

alter table public.wedding_rsvps
  add column if not exists attendance_days text not null default 'not_sure_yet';

alter table public.wedding_rsvps
  drop constraint if exists wedding_rsvps_attendance_days_check;

alter table public.wedding_rsvps
  add constraint wedding_rsvps_attendance_days_check
  check (attendance_days in ('all_days', 'wedding_day_only', 'not_sure_yet'));

create index if not exists wedding_rsvps_created_at_idx
  on public.wedding_rsvps (created_at desc);

alter table public.wedding_rsvps enable row level security;

drop policy if exists "allow insert anon wedding rsvps" on public.wedding_rsvps;
create policy "allow insert anon wedding rsvps"
  on public.wedding_rsvps
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "deny direct select for anon" on public.wedding_rsvps;
create policy "deny direct select for anon"
  on public.wedding_rsvps
  for select
  to anon, authenticated
  using (false);
