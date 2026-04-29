"use client";

export function AdminLogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
      className="rounded-full border border-stone-200 bg-white/85 px-5 py-2 text-xs uppercase tracking-[0.24em] text-stoneink/75 transition hover:bg-white"
    >
      Log out
    </button>
  );
}
