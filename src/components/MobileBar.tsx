"use client";

import { useEffect, useState } from "react";
import { talkToUs } from "@/content";

// Stays out of the way while the booking form is on screen, so it never covers
// the form's fields and never points parents at a form they can already see.
export function MobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("book");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting),
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-white p-3 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <a
        href="#book"
        className="flex-1 rounded-full bg-flame py-3 text-center font-semibold text-ink"
      >
        Book free session
      </a>
      <a
        href={talkToUs.href}
        {...(talkToUs.external && { target: "_blank", rel: "noreferrer" })}
        className="rounded-full bg-teal-deep px-6 py-3 font-semibold text-white"
      >
        {talkToUs.short}
      </a>
    </div>
  );
}
