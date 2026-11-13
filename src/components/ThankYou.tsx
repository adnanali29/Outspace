"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useContent } from "./ContentProvider";
import { Logo } from "./Logo";

const pad = (n: number) => String(n).padStart(2, "0");

const icsDate = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

// Saves the requested slot's next occurrence as a calendar file. The time is
// marked unconfirmed because the Relationship Team finalises it on WhatsApp.
function downloadCalendarFile(
  slotLabel: string,
  sessionSlots: { label: string; weekday: number; hour: number; minute: number }[],
  sessionMinutes: number,
) {
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

const secondaryButton =
  "cursor-pointer rounded-full px-6 py-3.5 font-semibold text-teal-deep ring-2 ring-teal-deep transition-colors hover:bg-mist";

export function ThankYou({ bookingRef, slot }: { bookingRef: string; slot: string }) {
  const { contact, sessionMinutes, sessionSlots, talkToUs, thanks, whatsappHref } = useContent();
  // Changing the time goes through WhatsApp, so it doesn't create a second booking.
  const digits = contact.whatsappNumber.replace(/\D/g, "");
  const changeTimeHref = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(`Hi Outpace Academy, I'd like to change the time for my booking ${bookingRef}.`)}`
    : talkToUs.href;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    headingRef.current?.focus();
  }, []);

  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="wrap flex h-[4.5rem] items-center">
          <Logo className="h-11" priority />
        </div>
      </header>

      <main className="min-h-[calc(100svh-73px)] bg-cream py-12 md:py-16">
        <div className="wrap max-w-[760px]">
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
            className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-[2.75rem]"
          >
            {thanks.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">{thanks.body}</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            <span>
              Booking code: <strong className="text-ink">{bookingRef}</strong>
            </span>
            <span>
              Requested time: <strong className="text-ink">{slot}</strong>
            </span>
          </p>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {thanks.next.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border-4 border-teal font-display font-bold text-teal-deep">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-tight font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 rounded-3xl bg-mist p-6">
            <h2 className="font-display text-lg font-bold">To get ready</h2>
            <p className="mt-1.5 text-muted">{thanks.ready}</p>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => downloadCalendarFile(slot, sessionSlots, sessionMinutes)}
              className="cursor-pointer rounded-full bg-flame px-6 py-3.5 font-semibold text-ink transition-shadow hover:shadow-lg hover:shadow-flame/30"
            >
              Add to calendar
            </button>
            <a
              href={changeTimeHref}
              {...((whatsappHref || talkToUs.external) && { target: "_blank", rel: "noreferrer" })}
              className={secondaryButton}
            >
              Change time
            </a>
            <Link href="/" className={secondaryButton}>
              Back to the website
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
