export type Consultation = {
  id: number;
  created_at: Date;
  parent_name: string;
  whatsapp: string;
  child_age: string;
  level: string;
  slot: string;
};

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
