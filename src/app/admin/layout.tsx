import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Outpace Academy",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-dvh bg-cream text-ink">{children}</div>;
}
