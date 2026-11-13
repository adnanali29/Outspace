import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { readSavedContent } from "@/lib/siteContent";
import { HomepageEditor } from "./HomepageEditor";
import { PanelLoading } from "./Loading";

export default function HomepageAdminPage() {
  return (
    <Suspense fallback={<PanelLoading />}>
      <Editor />
    </Suspense>
  );
}

async function Editor() {
  await requireAdmin();
  return <HomepageEditor initial={await readSavedContent()} />;
}
