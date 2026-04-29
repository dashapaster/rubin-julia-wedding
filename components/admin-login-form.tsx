"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function AdminLoginForm() {
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const next = params.get("next") || "/admin";
  const reason = params.get("reason");

  return (
    <form
      className="w-full max-w-md rounded-[2rem] border border-white/40 bg-white/85 p-8 shadow-glow backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          setError("");

          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: String(formData.get("password") || ""),
              next,
            }),
          });

          const data = await response.json();
          if (!response.ok) {
            setError(data.error || "Unable to sign in.");
            return;
          }

          window.location.href = data.redirectTo || "/admin";
        });
      }}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.36em] text-blush-600">Private Access</p>
      <h1 className="font-display text-4xl text-stoneink">Admin Login</h1>
      <p className="mt-4 text-base leading-7 text-stoneink/70">
        Enter the admin password to view RSVP responses and country statistics.
      </p>
      {reason === "missing-config" ? (
        <p className="mt-4 rounded-2xl border border-blush-200 bg-blush-100/70 px-4 py-3 text-sm text-blush-600">
          Admin access is not configured yet. Add `ADMIN_PASSWORD` and
          `ADMIN_SESSION_SECRET` to your environment variables.
        </p>
      ) : null}
      <label className="mt-6 grid gap-2 text-sm uppercase tracking-[0.14em] text-stoneink/70">
        <span>Password</span>
        <input
          type="password"
          name="password"
          required
          className="rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-olive-300"
          placeholder="Admin password"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-blush-500 to-olive-500 px-6 py-3 text-sm uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Signing in..." : "Open Dashboard"}
      </button>
      <p className="mt-4 min-h-6 text-sm text-blush-600">{error}</p>
    </form>
  );
}
