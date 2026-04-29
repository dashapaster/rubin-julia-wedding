"use client";

import { useState, useTransition } from "react";

export function AdminDeleteButton({ id, name }: { id: string; name: string }) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          const confirmed = window.confirm(`Delete RSVP from ${name}?`);
          if (!confirmed) {
            return;
          }

          startTransition(async () => {
            setError("");

            try {
              const response = await fetch(`/api/admin/rsvps/${id}`, {
                method: "DELETE",
              });

              const result = await response.json();

              if (!response.ok) {
                throw new Error(result.error || "Unable to delete RSVP.");
              }

              window.location.reload();
            } catch (deleteError) {
              setError(
                deleteError instanceof Error ? deleteError.message : "Unable to delete RSVP."
              );
            }
          });
        }}
        className="rounded-full border border-blush-200 bg-white px-4 py-2 text-[0.68rem] uppercase tracking-[0.2em] text-blush-700 transition hover:bg-blush-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
      {error ? <p className="max-w-[12rem] text-right text-xs text-blush-600">{error}</p> : null}
    </div>
  );
}
