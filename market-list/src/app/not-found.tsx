import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-4 px-4 py-8 text-center sm:px-8">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-zinc-600">The requested route does not exist.</p>
      <Link
        className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
        href="/"
      >
        Back to dashboard
      </Link>
    </main>
  );
}

