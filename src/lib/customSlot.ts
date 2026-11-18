// A time the parent picks themselves, saved as readable text such as
// "Tue, 24 Nov 2026, 4:30 PM" so it reads well in the admin panel and the CRM.

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Earliest and latest times a parent can pick.
export const CUSTOM_EARLIEST = "09:00";
export const CUSTOM_LATEST = "21:00";
// How far ahead a parent can book.
export const CUSTOM_DAYS_AHEAD = 60;

const pad = (n: number) => String(n).padStart(2, "0");

// "2026-11-24" for a date input, in the visitor's own time zone.
export function toDateValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toDate(dateValue: string, timeValue: string) {
  const [y, m, d] = dateValue.split("-").map(Number);
  const [h, min] = timeValue.split(":").map(Number);
  if (![y, m, d, h, min].every(Number.isFinite)) return null;
  return new Date(y, m - 1, d, h, min);
}

// Returns a problem to show, or null when the date and time are fine.
export function checkCustomSlot(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) return "Please pick a date and a time.";
  const picked = toDate(dateValue, timeValue);
  if (!picked) return "Please pick a date and a time.";
  if (picked.getTime() < Date.now()) return "Please pick a time that hasn't passed yet.";
  if (timeValue < CUSTOM_EARLIEST || timeValue > CUSTOM_LATEST) {
    return "Please pick a time between 9:00 AM and 9:00 PM.";
  }
  return null;
}

export function formatCustomSlot(dateValue: string, timeValue: string) {
  const picked = toDate(dateValue, timeValue);
  if (!picked) return "";
  const hour = picked.getHours() % 12 || 12;
  const suffix = picked.getHours() < 12 ? "AM" : "PM";
  return `${DAYS[picked.getDay()]}, ${picked.getDate()} ${MONTHS[picked.getMonth()]} ${picked.getFullYear()}, ${hour}:${pad(picked.getMinutes())} ${suffix}`;
}

// Reads a label made by formatCustomSlot back into a date, for the calendar file.
export function parseCustomSlot(label: string) {
  const match = /^\w{3}, (\d{1,2}) (\w{3}) (\d{4}), (\d{1,2}):(\d{2}) (AM|PM)$/.exec(label);
  if (!match) return null;
  const [, day, month, year, hour, minute, suffix] = match;
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex < 0) return null;
  const hours = (Number(hour) % 12) + (suffix === "PM" ? 12 : 0);
  return new Date(Number(year), monthIndex, Number(day), hours, Number(minute));
}
