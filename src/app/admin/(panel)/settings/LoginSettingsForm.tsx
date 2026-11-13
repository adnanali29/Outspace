"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent } from "react";
import { changeLogin } from "../../actions";
import { inputClass, labelClass, primaryButtonClass } from "../../ui";

export function LoginSettingsForm({ username }: { username: string }) {
  const [state, action, pending] = useActionState(changeLogin, null);
  const formRef = useRef<HTMLFormElement>(null);

  // Clears the password boxes once the new login is saved.
  useEffect(() => {
    if (!state?.ok) return;
    for (const name of ["password", "confirm", "current"]) {
      const input = formRef.current?.elements.namedItem(name);
      if (input instanceof HTMLInputElement) input.value = "";
    }
  }, [state]);

  // Submitting this way (not through the form's action) keeps what was typed
  // when there is an error, instead of React clearing the form.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  }
  return (
    <form ref={formRef} onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line">
      <div>
        <label htmlFor="username" className={labelClass}>
          Login ID
        </label>
        <input id="username" name="username" defaultValue={username} autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          New password <span className="font-normal text-muted">(at least 8 characters)</span>
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className={inputClass} />
      </div>
      <div>
        <label htmlFor="confirm" className={labelClass}>
          New password again
        </label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={8} className={inputClass} />
      </div>
      <div className="border-t border-line pt-4">
        <label htmlFor="current" className={labelClass}>
          Current password
        </label>
        <input id="current" name="current" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      {state?.error && (
        <p role="alert" className="rounded-xl bg-peach px-3 py-2 text-sm font-semibold text-ember">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p role="status" className="rounded-xl bg-mist px-3 py-2 text-sm font-semibold text-teal-deep">
          {state.ok}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? "Saving…" : "Save login details"}
      </button>
    </form>
  );
}
