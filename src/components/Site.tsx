"use client";

import { useState } from "react";
import type { Lead } from "./BookingForm";
import { Landing } from "./Landing";
import { ThankYou } from "./ThankYou";

// The site is one page: submitting the form swaps the landing content for the
// confirmation view. Leads are only held in this state for now, so connect
// handleSubmit to a CRM, sheet or API before going live.
export function Site() {
  const [lead, setLead] = useState<Lead | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(next: Lead) {
    setLead(next);
    setSubmitted(true);
  }

  if (submitted && lead) {
    return <ThankYou lead={lead} onReschedule={() => setSubmitted(false)} />;
  }

  return <Landing savedLead={lead} onSubmit={handleSubmit} />;
}
