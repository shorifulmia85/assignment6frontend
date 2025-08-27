import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <div
          className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl
                        bg-gradient-to-br from-primary to-accent text-primary-foreground shadow"
        >
          <SearchX className="h-8 w-8" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="mt-1 text-lg font-medium">Page not found</p>
        <p className="mt-2 text-muted-foreground">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-border px-4 py-2 hover:bg-muted"
          >
            Go back
          </button>
          <a
            href="/"
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}
