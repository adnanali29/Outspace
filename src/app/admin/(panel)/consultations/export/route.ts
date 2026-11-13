import { isAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { bookingRef, formatIST, statusLabel, type Consultation } from "@/lib/consultations";

// Excel treats cells starting with these as formulas, so they're neutralised.
function cell(value: string | number) {
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Please log in.", { status: 401 });

  const rows = await query<Consultation>(
    "select id, created_at, parent_name, whatsapp, child_age, level, slot, status from consultations order by id desc",
  );
  const header = ["Booking ref", "Submitted (IST)", "Parent name", "WhatsApp (+91)", "Child age", "Chess level", "Preferred time", "Status"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((row) =>
      [bookingRef(row.id), formatIST(row.created_at), row.parent_name, row.whatsapp, row.child_age, row.level, row.slot, statusLabel(row.status)]
        .map(cell)
        .join(","),
    ),
  ];
  const date = new Date().toISOString().slice(0, 10);

  // The BOM makes Excel read the file as UTF-8.
  return new Response(`﻿${lines.join("\r\n")}\r\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="outpace-consultations-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
