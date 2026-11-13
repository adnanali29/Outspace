"use server";

import type { Lead } from "@/components/BookingForm";
import { query } from "@/lib/db";

const clip = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Saves a booking from the landing page form. Returns an error message, or
// null when it was saved.
export async function saveConsultation(lead: Lead): Promise<string | null> {
  const parentName = clip(lead?.parentName, 120);
  const whatsapp = clip(lead?.whatsapp, 20).replace(/\s/g, "");
  const childAge = clip(lead?.childAge, 10);
  const level = clip(lead?.level, 80);
  const slot = clip(lead?.slot, 80);

  if (!parentName || !/^\d{10}$/.test(whatsapp) || !childAge || !level || !slot) {
    return "Please check the form and try again.";
  }

  try {
    await query(
      "insert into consultations (parent_name, whatsapp, child_age, level, slot) values ($1, $2, $3, $4, $5)",
      [parentName, whatsapp, childAge, level, slot],
    );
    return null;
  } catch (error) {
    console.error("Could not save consultation", error);
    return "Sorry, we couldn't send that. Please try again, or message us on WhatsApp.";
  }
}
