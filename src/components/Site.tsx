"use client";

import { useState } from "react";
import { saveConsultation } from "@/app/actions";
import type { Lead } from "./BookingForm";
import { Landing } from "./Landing";
import { ThankYou } from "./ThankYou";

// The site is one page: submitting the form saves the booking (it shows in
// /admin under Consultations) and swaps the landing content for the
// confirmation view.
export function Site() {
  const [lead, setLead] = useState<Lead | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(next: Lead) {
    const problem = await saveConsultation(next);
    if (problem) return problem;
    setLead(next);
    setSubmitted(true);
    return null;
  }

  if (submitted && lead) {
    return <ThankYou lead={lead} onReschedule={() => setSubmitted(false)} />;
  }

  return <Landing savedLead={lead} onSubmit={handleSubmit} />;
}
