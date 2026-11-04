"use client";

import { useEffect, useRef } from "react";
import { sessionMinutes, sessionSlots, thanks, whatsappHref } from "@/content";
import type { Lead } from "./BookingForm";

const pad = (n: number) => String(n).padStart(2, "0");

const icsDate = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

// Saves the requested slot's next occurrence as a calendar file. The time is
// marked unconfirmed because the Relationship Team finalises it on WhatsApp.
function downloadCalendarFile(slotLabel: string) {
  const slot = sessionSlots.find((s) => s.label === slotLabel);
  if (!slot) return;

  const start = new Date();
  start.setHours(slot.hour, slot.minute, 0, 0);
  const daysAhead = (slot.weekday - start.getDay() + 7) % 7;
  start.setDate(start.getDate() + (daysAhead === 0 ? 7 : daysAhead));
  const end = new Date(start.getTime() + sessionMinutes * 60_000);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Outpace Academy//Session//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@outpaceacademy.com`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    "SUMMARY:Outpace Introductory & Assessment Session (to be confirmed)",
    "DESCRIPTION:Requested time. Our Relationship Team will confirm on WhatsApp.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "outpace-session.ics";
  link.click();
  URL.revokeObjectURL(url);
}

export function ThankYou({
  lead,
  onReschedule,
}: {
  lead: Lead;
  onReschedule: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    headingRef.current?.focus();
  }, []);

  return (
    <>
      <header className="border-b border-white/10 bg-ink">
        <div className="wrap flex h-16 items-center">
          <span className="font-display text-xl font-semibold tracking-tight text-white">
            Outpace Academy
          </span>
        </div>
      </header>

      <main className="section-fade min-h-[calc(100svh-65px)] py-12 md:py-16"><div className="wrap max-w-[860px]">
        <span className="grid size-14 place-items-center rounded-full bg-flame">
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-6 fill-none stroke-ink stroke-[2.5]"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl"
        >
          {thanks.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{thanks.body}</p>
        <p className="mt-2 text-sm text-muted">
          Requested slot: <strong className="text-ink">{lead.slot}</strong>
        </p>

        <section className="mt-8 grid items-center gap-5 rounded-2xl border border-line bg-white p-6 md:grid-cols-[1fr_17rem]">
          <div className="flex items-center gap-5">
            <div className="grid size-24 shrink-0 place-items-center rounded-xl bg-ink-3 p-2 text-center text-xs font-semibold text-white">
              <span className="ph">{thanks.coach.photo}</span>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">
                Your coach
              </p>
              <h2 className="ph mt-1 font-display text-xl font-semibold">
                {thanks.coach.name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                <span className="ph">{thanks.coach.title}</span> |{" "}
                <span className="ph">{thanks.coach.style}</span>
              </p>
            </div>
          </div>
          <div className="grid aspect-video place-items-center rounded-xl bg-ink p-3 text-center text-sm font-semibold text-white">
            <span className="ph">{thanks.coach.video}</span>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What happens next</h2>
          <ol className="mt-5 space-y-5">
            {thanks.next.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-flame font-display font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg leading-tight font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-xl border border-line bg-white p-6">
          <h2 className="font-display text-lg font-semibold">To get ready</h2>
          <p className="mt-1.5 text-muted">{thanks.ready}</p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => downloadCalendarFile(lead.slot)}
            className="cursor-pointer rounded-lg bg-flame px-6 py-3.5 font-bold transition-colors hover:bg-flame-deep"
          >
            Add to calendar
          </button>
          <button
            type="button"
            onClick={onReschedule}
            className="cursor-pointer rounded-lg border border-ink px-6 py-3.5 font-semibold transition-colors hover:bg-white"
          >
            Reschedule
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-ink px-6 py-3.5 font-semibold transition-colors hover:bg-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div></main>
    </>
  );
}
