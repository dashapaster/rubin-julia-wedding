"use client";

import { useState, useTransition } from "react";

export type RsvpFormCopy = {
  fullName: string;
  fullNamePlaceholder: string;
  country: string;
  countryPlaceholder: string;
  attendance: string;
  yes: string;
  no: string;
  maybe: string;
  guests: string;
  message: string;
  messagePlaceholder: string;
  sending: string;
  submit: string;
  success: string;
  genericError: string;
};

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialState: SubmitState = {
  type: "idle",
  message: "",
};

export function RsvpForm({ copy }: { copy: RsvpFormCopy }) {
  const [state, setState] = useState<SubmitState>(initialState);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="grid gap-5 rounded-[2rem] border border-stone-200/70 bg-white/80 p-6 shadow-glow backdrop-blur md:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        startTransition(async () => {
          setState({ type: "idle", message: "" });

          const payload = {
            fullName: String(formData.get("fullName") || ""),
            attendance: String(formData.get("attendance") || ""),
            country: String(formData.get("country") || ""),
            guests: Number(formData.get("guests") || 1),
            message: String(formData.get("message") || ""),
          };

          try {
            const response = await fetch("/api/rsvp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || "Unable to submit RSVP.");
            }

            formElement.reset();
            setState({
              type: "success",
              message: copy.success,
            });
          } catch (error) {
            setState({
              type: "error",
              message:
                error instanceof Error
                  ? error.message
                  : copy.genericError,
            });
          }
        });
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={copy.fullName} htmlFor="fullName">
          <input
            id="fullName"
            name="fullName"
            required
            className="w-full rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-olive-300"
            placeholder={copy.fullNamePlaceholder}
          />
        </Field>

        <Field label={copy.country} htmlFor="country">
          <input
            id="country"
            name="country"
            required
            className="w-full rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-olive-300"
            placeholder={copy.countryPlaceholder}
          />
        </Field>
      </div>

      <Field label={copy.attendance}>
        <div className="grid gap-3 md:grid-cols-3">
          <Choice label={copy.yes} value="yes" />
          <Choice label={copy.no} value="no" />
          <Choice label={copy.maybe} value="maybe" />
        </div>
      </Field>

      <div className="grid gap-5 md:grid-cols-[minmax(0,220px)_1fr]">
        <Field label={copy.guests} htmlFor="guests">
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            required
            className="w-full rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-olive-300"
          />
        </Field>

        <Field label={copy.message} htmlFor="message">
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-2xl border border-stone-200 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-olive-300"
            placeholder={copy.messagePlaceholder}
          />
        </Field>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-gradient-to-r from-blush-500 to-olive-500 px-7 py-3 text-sm uppercase tracking-[0.24em] text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? copy.sending : copy.submit}
        </button>

        <p
          className={`text-sm ${
            state.type === "error" ? "text-blush-600" : "text-stoneink/70"
          }`}
          aria-live="polite"
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}

function Field({
  children,
  label,
  htmlFor,
}: {
  children: React.ReactNode;
  label: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2 text-sm uppercase tracking-[0.16em] text-stoneink/70">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Choice({ label, value }: { label: string; value: string }) {
  return (
    <label className="group relative cursor-pointer">
      <input type="radio" name="attendance" value={value} required className="peer sr-only" />
      <span className="flex rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-center text-sm uppercase tracking-[0.12em] text-stoneink/75 transition peer-checked:border-blush-300 peer-checked:bg-blush-100/70 peer-checked:text-stoneink group-hover:-translate-y-0.5">
        {label}
      </span>
    </label>
  );
}
