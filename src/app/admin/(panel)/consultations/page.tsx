import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { bookingRef, formatIST, STATUSES, statusLabel, type Consultation } from "@/lib/consultations";
import { query } from "@/lib/db";
import { primaryButtonClass } from "../../ui";
import { PanelLoading } from "../Loading";
import { RowActions, StatusPicker } from "./BookingActions";

const SHOWN = 500;

export default function ConsultationsPage() {
  return (
    <Suspense fallback={<PanelLoading />}>
      <Consultations />
    </Suspense>
  );
}

async function Consultations() {
  await requireAdmin();
  const [rows, counts] = await Promise.all([
    query<Consultation>(
      "select id, created_at, parent_name, whatsapp, child_age, level, slot, status from consultations order by id desc limit $1",
      [SHOWN],
    ),
    query<{ status: string; total: number }>("select status, count(*)::int as total from consultations group by status"),
  ]);
  const total = counts.reduce((sum, row) => sum + row.total, 0);
  const countOf = (status: string) => counts.find((row) => row.status === status)?.total ?? 0;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Consultations</h1>
          <p className="text-sm text-muted">
            {total === 0
              ? "No bookings yet. Each form sent from the homepage appears here."
              : `Newest first.${total > SHOWN ? ` Showing the latest ${SHOWN}; the CSV has them all.` : ""}`}
          </p>
        </div>
        {total > 0 && (
          <a href="/admin/consultations/export" className={primaryButtonClass}>
            Download CSV
          </a>
        )}
      </div>

      {total > 0 && (
        <>
          <ul className="mb-5 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full bg-teal-deep px-3 py-1 font-semibold text-white">{total} total</li>
            {STATUSES.filter((option) => countOf(option.value) > 0).map((option) => (
              <li key={option.value} className="rounded-full bg-white px-3 py-1 font-semibold ring-1 ring-line">
                {countOf(option.value)} {option.label.toLowerCase()}
              </li>
            ))}
          </ul>

          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-line">
            <table className="w-full min-w-[60rem] text-left text-sm">
              <thead className="bg-teal-deep text-xs tracking-wide text-white uppercase">
                <tr>
                  {["Booking ref", "Parent name", "Phone / WhatsApp", "Child", "Preferred time", "Status", "Actions"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className={`px-4 py-3.5 font-semibold whitespace-nowrap ${heading === "Actions" ? "text-right" : ""}`}
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row) => {
                  const ref = bookingRef(row.id);
                  const summary = [
                    ref,
                    row.parent_name,
                    `+91 ${row.whatsapp}`,
                    `Child age ${row.child_age}`,
                    row.level,
                    row.slot,
                    statusLabel(row.status),
                  ].join(" | ");
                  return (
                    <tr key={row.id} className="align-top hover:bg-cream/60">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="font-display text-base font-bold text-flame-deep">{ref}</p>
                        <p className="mt-0.5 text-xs text-muted">{formatIST(row.created_at)}</p>
                      </td>
                      <td className="px-4 py-4 font-semibold">{row.parent_name}</td>
                      <td className="px-4 py-4 whitespace-nowrap">+91 {row.whatsapp}</td>
                      <td className="px-4 py-4">
                        <p>Age {row.child_age}</p>
                        <p className="mt-1 inline-block rounded-md bg-mist px-2 py-0.5 text-xs font-semibold text-teal-deep">
                          {row.level}
                        </p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{row.slot}</td>
                      <td className="px-4 py-4">
                        <StatusPicker id={row.id} status={row.status} />
                      </td>
                      <td className="px-4 py-4">
                        <RowActions whatsapp={row.whatsapp} summary={summary} bookingRef={ref} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
