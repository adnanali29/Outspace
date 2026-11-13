import Link from "next/link";
import { Suspense } from "react";
import { isAdmin, usesDefaultLogin } from "@/lib/auth";
import { AdminNav } from "./AdminNav";

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="lg:flex">
      <AdminNav />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:py-8">
        <Suspense fallback={null}>
          <DefaultLoginWarning />
        </Suspense>
        {children}
      </main>
    </div>
  );
}

async function DefaultLoginWarning() {
  if (!(await isAdmin()) || !(await usesDefaultLogin())) return null;
  return (
    <p className="mb-6 rounded-2xl bg-peach px-4 py-3 text-sm font-semibold text-ember">
      You&rsquo;re still using the starting ID and password (1 / 1). Anyone could guess them.{" "}
      <Link href="/admin/settings" className="underline underline-offset-2">
        Change them in Settings
      </Link>
      .
    </p>
  );
}
