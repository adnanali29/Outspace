import { Suspense } from "react";
import { getAccount, requireAdmin } from "@/lib/auth";
import { PanelLoading } from "../Loading";
import { LoginSettingsForm } from "./LoginSettingsForm";

export default function SettingsPage() {
  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-bold">Settings</h1>
      <p className="mb-6 text-sm text-muted">Change the ID and password used to log in to this panel.</p>
      <Suspense fallback={<PanelLoading />}>
        <Settings />
      </Suspense>
    </div>
  );
}

async function Settings() {
  await requireAdmin();
  const { username } = await getAccount();
  return <LoginSettingsForm username={username} />;
}
