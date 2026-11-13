"use client";

import { useRouter } from "next/navigation";
import { saveConsultation } from "@/app/actions";
import type { Lead } from "./BookingForm";
import { Landing } from "./Landing";

// Submitting the form saves the booking (it shows in /admin under
// Consultations) and opens that booking's own thank-you page, such as
// /thank-you/OPA05, which ad pixels can track.
export function Site() {
  const router = useRouter();

  async function handleSubmit(lead: Lead) {
    const result = await saveConsultation(lead);
    if ("error" in result) return result.error;
    router.push(`/thank-you/${result.ref}`);
    return null;
  }

  return <Landing savedLead={null} onSubmit={handleSubmit} />;
}
