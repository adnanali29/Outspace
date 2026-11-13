export type Consultation = {
  id: number;
  created_at: Date;
  parent_name: string;
  whatsapp: string;
  child_age: string;
  level: string;
  slot: string;
  status: string;
};

// Booking codes are "OPA0" followed by the booking number: OPA01, OPA02, ...
export const bookingRef = (id: number) => `OPA0${id}`;

export function bookingIdFromRef(ref: string) {
  const match = /^OPA0(\d{1,9})$/i.exec(ref.trim());
  return match ? Number(match[1]) : null;
}

export const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "confirmed", label: "Session confirmed" },
  { value: "completed", label: "Session done" },
  { value: "enrolled", label: "Enrolled" },
  { value: "cancelled", label: "Not interested" },
] as const;

export const statusLabel = (value: string) => STATUSES.find((s) => s.value === value)?.label ?? value;

export function formatIST(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
