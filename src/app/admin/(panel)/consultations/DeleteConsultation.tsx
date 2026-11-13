"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteConsultation } from "../../actions";

export function DeleteConsultation({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete the booking from ${name}? This can't be undone.`)) return;
        startTransition(async () => {
          await deleteConsultation(id);
          router.refresh();
        });
      }}
      className="cursor-pointer text-sm font-semibold text-ember underline underline-offset-2 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
