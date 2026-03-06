"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-8 text-center sm:px-8">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-xl text-sm text-zinc-600">
        {error.message || "An unexpected error happened while loading this page."}
      </p>
      <button
        className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}

