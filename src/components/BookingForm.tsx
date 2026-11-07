"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { childAges, chessLevels, sessionSlots, talkToUs } from "@/content";

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
  if (!lead.slot) errors.slot = "Please pick a time.";
  return errors;
}

// Stays 16px on phones so iOS does not zoom into the field on focus.
const fieldClass =
  "w-full rounded-xl border-2 bg-white px-3 py-2.5 text-base text-ink placeholder:text-muted/80 lg:py-2 lg:text-sm";

const labelClass = "mb-1 block text-sm font-medium";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-peach">
      {message}
    </p>
  );
}

export function BookingForm({
  savedLead,
  onSubmit,
}: {
  savedLead: Lead | null;
  onSubmit: (lead: Lead) => void;
}) {
  const [lead, setLead] = useState<Lead>(savedLead ?? emptyLead);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Coming back from "Reschedule" lands on the form rather than the page top.
  const returning = useRef(savedLead !== null);
  useEffect(() => {
    if (returning.current) {
      formRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, []);

  function update<K extends keyof Lead>(key: K, value: string) {
    setLead((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(lead);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    onSubmit({ ...lead, whatsapp: lead.whatsapp.replace(/\s/g, "") });
  }

  const border = (key: keyof Lead) =>
    errors[key] ? "border-flame" : "border-transparent";

  return (
    <div
      id="book"
      className="rounded-[2rem] bg-teal-deep p-6 text-white shadow-2xl shadow-teal-deep/30 lg:p-7 short:p-5"
    >
      <h2 className="font-display text-[1.7rem] leading-tight font-bold">
        Book a free first session
      </h2>
      <p className="mt-1 text-sm">Meet a chess coach. No payment needed.</p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="mt-4 space-y-3 short:mt-3 short:space-y-2"
      >
        <div>
          <label htmlFor="parentName" className={labelClass}>
            Your name
          </label>
          <input
            id="parentName"
            name="parentName"
            autoComplete="name"
            placeholder="Parent’s name"
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

        <div className="grid grid-cols-2 gap-3">
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
          <legend className={labelClass}>Preferred time</legend>
          <div className="grid grid-cols-2 gap-2">
            {sessionSlots.map((slot) => (
              <label key={slot.label} className="cursor-pointer">
                <input
                  type="radio"
                  name="slot"
                  value={slot.label}
                  checked={lead.slot === slot.label}
                  onChange={(e) => update("slot", e.target.value)}
                  className="peer sr-only"
                />
                <span
                  className={`block rounded-xl border-2 bg-white px-2 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:border-flame peer-checked:border-flame peer-checked:bg-peach peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white lg:py-1.5 ${border("slot")}`}
                >
                  {slot.label}
                </span>
              </label>
            ))}
          </div>
          <FieldError id="slot-error" message={errors.slot} />
        </fieldset>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-full bg-flame px-4 py-3.5 font-semibold text-ink transition-all hover:shadow-lg hover:shadow-black/20 active:scale-[0.99] lg:py-3"
        >
          Book my free session
        </button>

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
