# Rubin & Julia Wedding Invitation

Wedding invitation website built with `Next.js`, `React`, `Tailwind CSS`, `TypeScript`, and `Supabase`.

It includes:

- multilingual invitation website
- RSVP form with persistent storage
- private admin / results page
- guest statistics by attendance and country
- deployment-ready structure for Vercel

## Run locally

Use Node `20.9+`.

```bash
cd "/Users/dashapasternak/Documents/rubin-julia-wedding"
npm install
npm run dev
```

Open:

- main site: `http://localhost:3000`
- admin login: `http://localhost:3000/admin`
- alternate results route: `http://localhost:3000/responses`

## Environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Add these values in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
SUPABASE_RSVP_TABLE=wedding_rsvps
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=your-long-random-secret
```

What each value does:

- `NEXT_PUBLIC_SUPABASE_URL`
  The project URL from your Supabase project settings.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  The public anon key from your Supabase project settings.
- `SUPABASE_SERVICE_ROLE_KEY`
  The server-side service role key used by the RSVP API and admin page.
- `SUPABASE_RSVP_TABLE`
  The table name for RSVP submissions. Default is `wedding_rsvps`.
- `ADMIN_PASSWORD`
  The password you use to open `/admin` or `/responses`.
- `ADMIN_SESSION_SECRET`
  A long random string used to protect the admin session cookie.

Important:

- after changing `.env.local`, restart `npm run dev`
- `.env.local` stays local and is not committed

## Supabase setup

1. Create a new Supabase project.
2. Open the SQL editor.
3. Run the SQL from [supabase/schema.sql](/Users/dashapasternak/Documents/rubin-julia-wedding/supabase/schema.sql).
4. Copy the project URL and keys into `.env.local`.

The RSVP table stores:

- full name
- country
- attendance answer
- attendance days
- number of guests
- optional message
- phone number
- questions for the couple
- submission date

If you add new RSVP fields later, run [supabase/schema.sql](/Users/dashapasternak/Documents/rubin-julia-wedding/supabase/schema.sql) again in Supabase SQL Editor so the table stays in sync.

Default table name:

- `wedding_rsvps`

If you want a different table name, update:

- `SUPABASE_RSVP_TABLE` in `.env.local`
- the SQL schema / table in Supabase to match

## RSVP behavior

The form sends data through:

- [app/api/rsvp/route.ts](/Users/dashapasternak/Documents/rubin-julia-wedding/app/api/rsvp/route.ts)

Successful submission shows:

- `Thank you! Your response has been received.`

If Supabase is not configured, the API returns a clear developer-facing message telling you which environment variables are missing.

## Admin / results page

Open:

- `http://localhost:3000/admin`
or
- `http://localhost:3000/responses`

The admin page shows:

- all RSVP responses
- full name
- country
- attendance answer
- number of guests
- optional message
- submission date
- delete button for removing a response

It also shows statistics:

- total responses
- total guests coming
- total guests not coming
- total guests not sure yet
- countries summary with guest counts

## Admin password setup

Admin access is protected by:

- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

To change the admin password later:

1. update `ADMIN_PASSWORD`
2. update `ADMIN_SESSION_SECRET`
3. restart locally or redeploy

## Deploy to Vercel

If you are not a developer, use this simple order:

1. Put the project on GitHub.
2. Import the GitHub repository into Vercel.
3. Add the environment variables in Vercel.
4. Click deploy.

### Step 1. Upload the project to GitHub

- Create a new GitHub repository.
- Upload the contents of this project folder.

### Step 2. Import the project into Vercel

1. Go to [Vercel](https://vercel.com/).
2. Click `Add New...` -> `Project`.
3. Choose your GitHub repository.
4. Click `Import`.

Vercel will detect that this is a `Next.js` project automatically.

### Step 3. Add environment variables in Vercel

In Vercel open:

- `Project`
- `Settings`
- `Environment Variables`

Add the same values you used in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
SUPABASE_RSVP_TABLE=wedding_rsvps
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=your-long-random-secret
```

Important:

- `NEXT_PUBLIC_SITE_URL` must be your final Vercel URL
- `ADMIN_PASSWORD` is the password you will use for `/admin`
- `ADMIN_SESSION_SECRET` should be a long random string

### Step 4. Deploy

- Click `Deploy`
- Wait until Vercel finishes building the site
- Open the live link Vercel gives you

Whenever you update the code on GitHub, Vercel can deploy the new version again automatically.

If you prefer Vercel CLI instead of GitHub, you can also use:

```bash
vercel
vercel --prod
```

## How to open the admin page

After deployment, open:

- `https://your-project-name.vercel.app/admin`

or:

- `https://your-project-name.vercel.app/responses`

Log in with the value from:

- `ADMIN_PASSWORD`

## Project paths

Key files:

- [app/page.tsx](/Users/dashapasternak/Documents/rubin-julia-wedding/app/page.tsx)
- [app/api/rsvp/route.ts](/Users/dashapasternak/Documents/rubin-julia-wedding/app/api/rsvp/route.ts)
- [app/admin/page.tsx](/Users/dashapasternak/Documents/rubin-julia-wedding/app/admin/page.tsx)
- [lib/supabase.ts](/Users/dashapasternak/Documents/rubin-julia-wedding/lib/supabase.ts)
- [supabase/schema.sql](/Users/dashapasternak/Documents/rubin-julia-wedding/supabase/schema.sql)
