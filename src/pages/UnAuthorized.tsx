import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-4">
      <section className="text-center max-w-md">
        <div
          className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl
                     bg-gradient-to-br from-primary to-accent text-primary-foreground shadow"
          aria-hidden
        >
          <ShieldAlert className="h-8 w-8" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">401</h1>
        <p className="mt-1 text-lg font-semibold">Unauthorized</p>
        <p className="mt-2 text-muted-foreground">
          You don’t have permission to view this page.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/login"
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Sign in
          </a>
          <a
            href="/"
            className="rounded-lg border border-border px-4 py-2 hover:bg-muted"
          >
            Go home
          </a>
          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-border px-4 py-2 hover:bg-muted"
          >
            Go back
          </button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          If you think this is a mistake, contact your administrator.
        </p>
      </section>
    </main>
  );
}
