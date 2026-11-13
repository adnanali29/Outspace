"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { login } from "../actions";
import { inputClass, labelClass, primaryButtonClass } from "../ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  // Submitting this way (not through the form's action) keeps what was typed
  // when there is an error, instead of React clearing the form.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => action(data));
  }
  return (
    <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl bg-white p-6 shadow-xl shadow-teal-deep/10 ring-1 ring-line">
      <div>
        <label htmlFor="username" className={labelClass}>
          Login ID
        </label>
        <input id="username" name="username" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      {state?.error && (
        <p role="alert" className="rounded-xl bg-peach px-3 py-2 text-sm font-semibold text-ember">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${primaryButtonClass} w-full`}>
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
