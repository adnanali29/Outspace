import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ContentProvider } from "@/components/ContentProvider";
import { MetaPixel } from "@/components/MetaPixel";
import { ThankYou } from "@/components/ThankYou";
import { bookingIdFromRef, bookingRef } from "@/lib/consultations";
import { query } from "@/lib/db";
import { getSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Thank you | Outpace Academy",
  robots: { index: false, follow: false },
};

// Each booking has its own thank-you page, such as /thank-you/OPA05, so ad
// pixels can count bookings. It shows only the booking code and the chosen
// time, never the parent's details.
export default function ThankYouPage({ params }: PageProps<"/thank-you/[ref]">) {
  return (
    <Suspense fallback={<p className="py-24 text-center text-muted">Loading&hellip;</p>}>
      <Booking params={params} />
    </Suspense>
  );
}

async function Booking({ params }: { params: PageProps<"/thank-you/[ref]">["params"] }) {
  const { ref } = await params;
  const id = bookingIdFromRef(ref);
  if (!id) notFound();
  const code = bookingRef(id);
  if (ref !== code) redirect(`/thank-you/${code}`);

  const [rows, content] = await Promise.all([
    query<{ slot: string }>("select slot from consultations where id = $1", [id]),
    getSiteContent(),
  ]);
  if (!rows[0]) notFound();

  return (
    <ContentProvider content={content}>
      <MetaPixel lead={code} />
      <ThankYou bookingRef={code} slot={rows[0].slot} />
    </ContentProvider>
  );
}
