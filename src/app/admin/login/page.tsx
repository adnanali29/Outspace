import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-5 py-10">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-sm font-semibold tracking-wide text-ember uppercase">
          Outpace Academy
        </p>
        <h1 className="mt-1 text-center font-display text-3xl font-bold">Admin login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
