"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { childAges, chessLevels, sessionSlots, whatsappHref } from "@/content";

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
  if (!lead.slot) errors.slot = "Please pick a session slot.";
  return errors;
}

// Stays 16px on phones so iOS does not zoom into the field on focus.
const fieldClass =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-base text-ink placeholder:text-muted/70 lg:py-2 lg:text-sm";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm font-medium text-red-700">
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
    errors[key] ? "border-red-600" : "border-mist";

  return (
    <div
      id="book"
      className="rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-black/40 ring-1 ring-white/10 lg:p-5 short:p-4"
    >
      <h2 className="font-display text-2xl leading-tight font-semibold lg:text-xl">
        Book a free introductory &amp; assessment session
      </h2>
      <p className="mt-1.5 text-sm text-muted short:hidden">
        Share your details. Our Relationship Team will contact you to arrange a
        suitable session.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="mt-4 space-y-3 short:mt-3 short:space-y-2.5"
      >
        <div className="grid gap-3 lg:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="mb-1 block text-sm font-semibold">
            Parent name
          </label>
          <input
            id="parentName"
            name="parentName"
            autoComplete="name"
            placeholder="Your name"
            value={lead.parentName}
            onChange={(e) => update("parentName", e.target.value)}
            aria-invalid={!!errors.parentName}
            aria-describedby="parentName-error"
            className={`${fieldClass} ${border("parentName")}`}
          />
          <FieldError id="parentName-error" message={errors.parentName} />
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-1 block text-sm font-semibold">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="childAge" className="mb-1 block text-sm font-semibold">
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
            <label htmlFor="level" className="mb-1 block text-sm font-semibold">
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
          <legend className="mb-1 text-sm font-semibold">
            Preferred session slot
          </legend>
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
                  className={`block rounded-lg border px-2 py-2.5 text-center text-sm font-semibold transition-colors lg:py-1.5 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-flame hover:border-ink ${border("slot")}`}
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
          className="w-full cursor-pointer rounded-lg bg-flame px-4 py-3 font-bold text-ink transition-all hover:bg-flame-deep active:scale-[0.99] lg:py-2.5"
        >
          Book my free session
        </button>

        <p className="text-center text-xs text-muted">
          Our team will contact you on WhatsApp to confirm the session details.
        </p>
        <p className="text-center text-xs font-semibold">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-3"
          >
            Prefer to chat? Message us on WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}
