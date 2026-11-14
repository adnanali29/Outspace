"use client";

import Script from "next/script";
import { useContent } from "./ContentProvider";

// Loads the Meta Pixel when an ID is set in the admin panel, and records a
// PageView. On a booking's thank-you page it also records a Lead, once per
// booking, using the booking code as the event ID.
export function MetaPixel({ lead }: { lead?: string }) {
  const { tracking } = useContent();
  const pixelId = tracking.metaPixelId.trim();
  if (!/^\d{5,20}$/.test(pixelId)) return null;
  const leadRef = lead && /^OPA0\d+$/.test(lead) ? lead : null;

  const code = `
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
    }
    fbq('track', 'PageView');
    ${
      leadRef
        ? `(function () {
      var key = 'opa-lead-${leadRef}';
      try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1'); } catch (e) {}
      fbq('track', 'Lead', { content_name: 'Free session booking' }, { eventID: '${leadRef}' });
    })();`
        : ""
    }
  `;

  return (
    <>
      <Script id={leadRef ? `meta-pixel-${leadRef}` : "meta-pixel"} strategy="afterInteractive">
        {code}
      </Script>
      {/* Counts the visit for browsers with JavaScript turned off. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's tracking pixel */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
