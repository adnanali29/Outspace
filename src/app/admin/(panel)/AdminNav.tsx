"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../actions";

const links = [
  { href: "/admin", label: "Homepage" },
  { href: "/admin/consultations", label: "Consultations" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 z-30 bg-teal-deep text-white lg:h-dvh lg:w-60 lg:shrink-0">
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:block lg:px-5 lg:py-6">
        <div>
          <p className="font-display text-lg font-bold leading-tight">Outpace Admin</p>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-white/80 underline-offset-2 hover:underline"
          >
            View site &#8599;
          </a>
        </div>
        <form action={logout} className="lg:hidden">
          <button type="submit" className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-white/60">
            Log out
          </button>
        </form>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-0">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                active ? "bg-white text-teal-deep" : "text-white hover:bg-white/15"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action={logout} className="hidden px-3 lg:absolute lg:bottom-6 lg:block lg:w-full">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-white/90 hover:bg-white/15"
        >
          Log out
        </button>
      </form>
    </aside>
  );
}
