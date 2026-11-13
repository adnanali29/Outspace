"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { STATUSES } from "@/lib/consultations";
import { setConsultationStatus } from "../../actions";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-peach text-ember ring-flame/50",
  contacted: "bg-mist text-teal-deep ring-teal/40",
  confirmed: "bg-teal-deep text-white ring-teal-deep",
  completed: "bg-ink text-white ring-ink",
  enrolled: "bg-[#e3f6e8] text-[#1d6b34] ring-[#59b36f]",
  cancelled: "bg-white text-muted ring-line",
};

export function StatusPicker({ id, status }: { id: number; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();
  return (
    <select
      aria-label="Booking status"
      value={value}
      disabled={pending}
      onChange={(event) => {
        const next = event.target.value;
        setValue(next);
        startTransition(async () => {
          await setConsultationStatus(id, next);
          router.refresh();
        });
      }}
      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold ring-1 transition-opacity disabled:opacity-60 ${
        STATUS_STYLES[value] ?? STATUS_STYLES.pending
      }`}
    >
      {STATUSES.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const iconButton =
  "grid size-9 cursor-pointer place-items-center rounded-xl ring-1 transition-colors";

export function RowActions({ whatsapp, summary, bookingRef }: { whatsapp: string; summary: string; bookingRef: string }) {
  const [copied, setCopied] = useState(false);
  const message = encodeURIComponent(`Hi, this is Outpace Academy about your free chess session booking ${bookingRef}.`);
  return (
    <div className="flex justify-end gap-2">
      <a
        href={`https://wa.me/91${whatsapp}?text=${message}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Message on WhatsApp"
        title="Message on WhatsApp"
        className={`${iconButton} bg-[#e3f6e8] text-[#1d6b34] ring-[#59b36f]/60 hover:bg-[#25D366] hover:text-white`}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
          <path d="M12.05 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.05 2Zm5.8 14.12c-.25.69-1.44 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.13-.98-.32-1.69-.62-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.21-1.61-1.21-3.07s.77-2.18 1.04-2.48c.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.84 2.06.91 2.21.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.3.15.47.12.64-.07.17-.2.74-.87.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.08.12.08.72-.17 1.41Z" />
        </svg>
      </a>
      <a
        href={`tel:+91${whatsapp}`}
        aria-label="Call"
        title="Call"
        className={`${iconButton} bg-mist text-teal-deep ring-teal/40 hover:bg-teal-deep hover:text-white`}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-none stroke-current stroke-2">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
        </svg>
      </a>
      <button
        type="button"
        aria-label={copied ? "Copied" : "Copy booking details"}
        title={copied ? "Copied" : "Copy booking details"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            window.prompt("Copy these details:", summary);
          }
        }}
        className={`${iconButton} bg-white text-ink ring-line hover:bg-cream`}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-none stroke-current stroke-[2.5]">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-none stroke-current stroke-2">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </svg>
        )}
      </button>
    </div>
  );
}

// Reloads the list from the database to show new bookings.
export function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => router.refresh())}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-teal-deep ring-2 ring-teal-deep transition-colors hover:bg-teal-deep hover:text-white disabled:cursor-wait disabled:opacity-70"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`size-4 fill-none stroke-current stroke-[2.5] ${pending ? "animate-spin" : ""}`}
      >
        <path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" />
      </svg>
      {pending ? "Refreshing…" : "Refresh"}
    </button>
  );
}
