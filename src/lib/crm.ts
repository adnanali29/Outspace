import "server-only";

// Sends a website booking to the DealConverter CRM through its webhook
// ("Outpace Website" in CRM Settings → Integrations → Webhook Integration).
// The field names match the ones that webhook was set up with.
export type CrmLead = {
  ref: string;
  parentName: string;
  whatsapp: string;
  childAge: string;
  level: string;
  slot: string;
};

export async function sendLeadToCrm(lead: CrmLead) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;

  const description = [
    `Website booking ${lead.ref}`,
    `Child age: ${lead.childAge}`,
    `Chess level: ${lead.level}`,
    `Preferred time: ${lead.slot}`,
  ].join(" | ");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_name: lead.parentName,
        mobile: `+91${lead.whatsapp}`,
        age_of_the_lead: lead.childAge,
        description,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`CRM webhook answered ${response.status}:`, (await response.text()).slice(0, 300));
    }
  } catch (error) {
    // The booking is already saved; a CRM problem must not affect the family.
    console.error("Could not send booking to the CRM", error);
  }
}
