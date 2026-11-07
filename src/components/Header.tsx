"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/content";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlights the link for whichever section crosses the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...navLinks.map((link) => link.href.slice(1))]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="wrap-wide flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" className="shrink-0">
          <Logo className="h-11" priority />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className="rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:text-teal-deep aria-[current]:text-teal-deep"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#book"
            className="hidden rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-ink transition-shadow hover:shadow-lg hover:shadow-flame/30 sm:block"
          >
            Book free session
          </a>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-teal-deep lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-5 fill-none stroke-current stroke-2"
            >
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-line bg-white lg:hidden"
        >
          <ul className="wrap-wide py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
