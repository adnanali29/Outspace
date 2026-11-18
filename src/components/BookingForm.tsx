"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  CUSTOM_DAYS_AHEAD,
  CUSTOM_EARLIEST,
  CUSTOM_LATEST,
  checkCustomSlot,
  formatCustomSlot,
  toDateValue,
} from "@/lib/customSlot";
import { useContent } from "./ContentProvider";

export type Lead = {
  parentName: string;
  whatsapp: string;
  childAge: string;
  level: string;
  slot: string;
};

type Errors = Partial<Record<keyof Lead, string>>;

const emptyLead: Lead = {
  parentName: "",
  whatsapp: "",
  childAge: "",
  level: "",
  slot: "",
};

function validate(lead: Lead): Errors {
  const errors: Errors = {};
  if (!lead.parentName.trim()) errors.parentName = "Please enter your name.";
  if (!/^\d{10}$/.test(lead.whatsapp.replace(/\s/g, "")))
    errors.whatsapp = "Please enter a 10-digit mobile number.";
  if (!lead.childAge) errors.childAge = "Please select an age.";
  if (!lead.level) errors.level = "Please select a level.";
  if (!lead.slot) errors.slot = "Please pick a time, or choose a date and time.";
  return errors;
}

// Stays 16px on phones so iOS does not zoom into the field on focus.
const fieldClass =
  "w-full rounded-xl border-2 bg-white px-3 py-2 text-base text-ink placeholder:text-muted/80 lg:py-1.5 lg:text-sm";

const labelClass = "mb-0.5 block text-sm font-medium";

// A time option: a white tile that turns peach with an orange border when picked.
const optionClass =
  "rounded-xl border-2 bg-white text-center font-medium text-ink transition-colors hover:border-flame peer-checked:border-flame peer-checked:bg-peach peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white";

// A small "*" while a choice is still needed, or "(optional)" once the other
// choice has been made.
function Need({ optional }: { optional: boolean }) {
  return optional ? (
    <span className="text-xs font-normal opacity-80">(optional)</span>
  ) : (
    <span aria-hidden className="font-bold text-flame">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    // Kept for screen readers only; on screen the field's orange outline shows
    // what needs fixing.
    <p id={id} className="sr-only">
      {message}
    </p>
  );
}

export function BookingForm({
  savedLead,
  onSubmit,
}: {
  savedLead: Lead | null;
  onSubmit: (lead: Lead) => Promise<string | null>;
}) {
  const { childAges, chessLevels, sessionSlots, talkToUs } = useContent();
  const [lead, setLead] = useState<Lead>(savedLead ?? emptyLead);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  // A date and time the parent picks instead of a set slot; the slot text is
  // built from these on submit.
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [dateRange, setDateRange] = useState({ min: "", max: "" });
  const custom = Boolean(customDate || customTime);
  const formRef = useRef<HTMLFormElement>(null);

  // Coming back from "Reschedule" lands on the form rather than the page top.
  const returning = useRef(savedLead !== null);
  useEffect(() => {
    if (returning.current) {
      formRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, []);

  // After a booking the thank-you page opens. Next.js keeps this page's state
  // for the Back button, so the form is cleared when the page is left (and
  // again if the browser restores it from its own back/forward cache). Coming
  // back then shows an empty form, with no time picked, ready for a new booking.
  const booked = useRef(false);
  useEffect(() => {
    const clear = () => {
      setSending(false);
      if (!booked.current) return;
      booked.current = false;
      setLead(emptyLead);
      setCustomDate("");
      setCustomTime("");
      setErrors({});
      setSendError(null);
    };
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) clear();
    };
    window.addEventListener("pageshow", onShow);
    return () => {
      window.removeEventListener("pageshow", onShow);
      clear();
    };
  }, []);

  function update<K extends keyof Lead>(key: K, value: string) {
    setLead((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function chooseSlot(label: string) {
    setCustomDate("");
    setCustomTime("");
    update("slot", label);
  }

  // Worked out when the date box is used, so it is always the visitor's
  // current date.
  function setRangeFromToday() {
    const today = new Date();
    const last = new Date(today);
    last.setDate(today.getDate() + CUSTOM_DAYS_AHEAD);
    setDateRange({ min: toDateValue(today), max: toDateValue(last) });
  }

  // Picking a date or time replaces any set slot that was chosen.
  function updateCustom(date: string, time: string) {
    setCustomDate(date);
    setCustomTime(time);
    update("slot", "");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const customProblem = custom ? checkCustomSlot(customDate, customTime) : null;
    const slot = custom && !customProblem ? formatCustomSlot(customDate, customTime) : lead.slot;
    const found = validate({ ...lead, slot });
    if (customProblem) found.slot = customProblem;
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      const target = first === "slot" && custom ? "customDate" : first;
      formRef.current?.querySelector<HTMLElement>(`[name="${target}"]`)?.focus();
      return;
    }
    setSending(true);
    setSendError(null);
    const problem = await onSubmit({ ...lead, slot, whatsapp: lead.whatsapp.replace(/\s/g, "") });
    // On success the thank-you page opens, so the button stays disabled.
    if (!problem) booked.current = true;
    if (problem) {
      setSending(false);
      setSendError(problem);
    }
  }

  const border = (key: keyof Lead) =>
    errors[key] ? "border-flame" : "border-transparent";
  // A filled date or time box is outlined like a picked slot.
  const customBorder = (value: string) =>
    errors.slot || value ? "border-flame" : "border-transparent";

  return (
    <div
      id="book"
      className="rounded-[1.75rem] bg-teal-deep p-5 text-white shadow-2xl shadow-teal-deep/30 lg:p-6 short:p-4"
    >
      <h2 className="font-display text-2xl leading-tight font-bold">
        Let&rsquo;s understand your child.
      </h2>
      <p className="mt-1 text-sm">Book a free Introductory &amp; Assessment Session.</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="mt-3 space-y-2.5 short:mt-2 short:space-y-2"
      >
        <div>
          <label htmlFor="parentName" className={labelClass}>
            Your name
          </label>
          <input
            id="parentName"
            name="parentName"
            autoComplete="name"
            placeholder="Parent's name"
            value={lead.parentName}
            onChange={(e) => update("parentName", e.target.value)}
            aria-invalid={!!errors.parentName}
            aria-describedby="parentName-error"
            className={`${fieldClass} ${border("parentName")}`}
          />
          <FieldError id="parentName-error" message={errors.parentName} />
        </div>

        <div>
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp number
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit mobile number"
            value={lead.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            aria-invalid={!!errors.whatsapp}
            aria-describedby="whatsapp-error"
            className={`${fieldClass} ${border("whatsapp")}`}
          />
          <FieldError id="whatsapp-error" message={errors.whatsapp} />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="childAge" className={labelClass}>
              Child&rsquo;s age
            </label>
            <select
              id="childAge"
              name="childAge"
              value={lead.childAge}
              onChange={(e) => update("childAge", e.target.value)}
              aria-invalid={!!errors.childAge}
              aria-describedby="childAge-error"
              className={`${fieldClass} ${border("childAge")}`}
            >
              <option value="">Select</option>
              {childAges.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            <FieldError id="childAge-error" message={errors.childAge} />
          </div>
          <div>
            <label htmlFor="level" className={labelClass}>
              Chess level
            </label>
            <select
              id="level"
              name="level"
              value={lead.level}
              onChange={(e) => update("level", e.target.value)}
              aria-invalid={!!errors.level}
              aria-describedby="level-error"
              className={`${fieldClass} ${border("level")}`}
            >
              <option value="">Select</option>
              {chessLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <FieldError id="level-error" message={errors.level} />
          </div>
        </div>

        <fieldset aria-describedby="slot-error">
          {/* One of the two is needed: a set slot, or the parent's own date and
              time. Both read as required until one is picked; then the other
              reads as optional. */}
          <legend className={labelClass}>
            Preferred time <Need optional={custom} />
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {sessionSlots.map((slot) => {
              const [day, ...time] = slot.label.split(", ");
              return (
                <label key={slot.label} className="cursor-pointer">
                  <input
                    type="radio"
                    name="slot"
                    value={slot.label}
                    checked={!custom && lead.slot === slot.label}
                    onChange={() => chooseSlot(slot.label)}
                    className="peer sr-only"
                  />
                  <span
                    className={`${optionClass} flex flex-col items-center px-1 py-1.5 leading-tight lg:py-1 ${border("slot")}`}
                  >
                    <span className="text-xs">{day}</span>
                    <span className="text-sm whitespace-nowrap">{time.join(", ") || day}</span>
                  </span>
                </label>
              );
            })}
          </div>

          <p className="mt-2 mb-0.5 text-sm font-medium">
            Choose your date and time <Need optional={!custom && !!lead.slot} />
          </p>
          <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="customDate" className="sr-only">
                  Date
                </label>
                <input
                  id="customDate"
                  name="customDate"
                  type="date"
                  min={dateRange.min}
                  max={dateRange.max}
                  onFocus={setRangeFromToday}
                  onPointerDown={setRangeFromToday}
                  value={customDate}
                  onChange={(e) => updateCustom(e.target.value, customTime)}
                  aria-invalid={!!errors.slot}
                  className={`${fieldClass} ${customBorder(customDate)} [color-scheme:light]`}
                />
              </div>
              <div>
                <label htmlFor="customTime" className="sr-only">
                  Time
                </label>
                <input
                  id="customTime"
                  name="customTime"
                  type="time"
                  min={CUSTOM_EARLIEST}
                  max={CUSTOM_LATEST}
                  step={900}
                  value={customTime}
                  onChange={(e) => updateCustom(customDate, e.target.value)}
                  aria-invalid={!!errors.slot}
                  className={`${fieldClass} ${customBorder(customTime)} [color-scheme:light]`}
                />
              </div>
            </div>
          <FieldError id="slot-error" message={errors.slot} />
        </fieldset>

        <button
          type="submit"
          disabled={sending}
          className="w-full cursor-pointer rounded-full bg-flame px-4 py-3 font-semibold text-ink transition-all hover:shadow-lg hover:shadow-black/20 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 lg:py-2.5"
        >
          {sending ? "Sending\u2026" : "Book my free session"}
        </button>
        {sendError && (
          <p role="alert" className="rounded-xl bg-white px-3 py-2 text-center text-sm font-semibold text-ember">
            {sendError}
          </p>
        )}

        <p className="text-center text-xs">
          We&rsquo;ll confirm the time on WhatsApp.{" "}
          <a
            href={talkToUs.href}
            {...(talkToUs.external && { target: "_blank", rel: "noreferrer" })}
            className="font-semibold whitespace-nowrap underline underline-offset-3"
          >
            {talkToUs.label}
          </a>
        </p>
      </form>
    </div>
  );
}
