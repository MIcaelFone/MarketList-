import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Market List</h1>
        <p className="text-sm text-zinc-600">
          Application shell baseline for list planning and budget tracking.
        </p>
      </header>
      <nav className="flex flex-wrap gap-3">
        <Link
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
          href="/lists/demo-list"
        >
          Open List Scaffold
        </Link>
      </nav>
      <section className="rounded-lg border border-zinc-200 p-4">
        <h2 className="text-lg font-semibold">Shell Ready</h2>
        <p className="text-sm text-zinc-600">
          Root route and list route scaffold are available.
        </p>
      </section>
    </main>
  );
}
