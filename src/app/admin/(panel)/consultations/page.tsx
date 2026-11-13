import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { formatIST, type Consultation } from "@/lib/consultations";
import { query } from "@/lib/db";
import { primaryButtonClass } from "../../ui";
import { PanelLoading } from "../Loading";
import { DeleteConsultation } from "./DeleteConsultation";

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
  const [rows, count] = await Promise.all([
    query<Consultation>(
      "select id, created_at, parent_name, whatsapp, child_age, level, slot from consultations order by created_at desc limit $1",
      [SHOWN],
    ),
    query<{ total: number }>("select count(*)::int as total from consultations"),
  ]);
  const total = count[0]?.total ?? 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Consultations</h1>
          <p className="text-sm text-muted">
            {total === 0
              ? "No bookings yet. Each form sent from the homepage appears here."
              : `${total} booking${total === 1 ? "" : "s"}, newest first.${total > SHOWN ? ` Showing the latest ${SHOWN}; the CSV has them all.` : ""}`}
          </p>
        </div>
        {total > 0 && (
          <a href="/admin/consultations/export" className={primaryButtonClass}>
            Download CSV
          </a>
        )}
      </div>

      {total > 0 && (
        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-line">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-teal-deep text-white">
              <tr>
                {["Submitted (IST)", "Parent", "WhatsApp", "Child age", "Chess level", "Preferred time", ""].map((heading) => (
                  <th key={heading} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-cream/70">
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{formatIST(row.created_at)}</td>
                  <td className="px-4 py-3 font-semibold">{row.parent_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a
                      href={`https://wa.me/91${row.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-teal-deep underline underline-offset-2"
                    >
                      {row.whatsapp}
                    </a>
                  </td>
                  <td className="px-4 py-3">{row.child_age}</td>
                  <td className="px-4 py-3">{row.level}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.slot}</td>
                  <td className="px-4 py-3 text-right">
                    <DeleteConsultation id={row.id} name={row.parent_name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
