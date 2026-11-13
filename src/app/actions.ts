"use server";

import type { Lead } from "@/components/BookingForm";
import { bookingRef } from "@/lib/consultations";
import { query } from "@/lib/db";

const clip = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Saves a booking from the landing page form. Returns its booking code (like
// OPA05), or an error message.
export async function saveConsultation(lead: Lead): Promise<{ ref: string } | { error: string }> {
  const parentName = clip(lead?.parentName, 120);
  const whatsapp = clip(lead?.whatsapp, 20).replace(/\s/g, "");
  const childAge = clip(lead?.childAge, 10);
  const level = clip(lead?.level, 80);
  const slot = clip(lead?.slot, 80);

  if (!parentName || !/^\d{10}$/.test(whatsapp) || !childAge || !level || !slot) {
    return { error: "Please check the form and try again." };
  }

  try {
    const rows = await query<{ id: number }>(
      "insert into consultations (parent_name, whatsapp, child_age, level, slot) values ($1, $2, $3, $4, $5) returning id",
      [parentName, whatsapp, childAge, level, slot],
    );
    return { ref: bookingRef(rows[0].id) };
  } catch (error) {
    console.error("Could not save consultation", error);
    return { error: "Sorry, we couldn't send that. Please try again, or message us on WhatsApp." };
  }
}
