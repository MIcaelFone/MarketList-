type ListPageProps = {
  params: Promise<{ listId: string }>;
};

export default async function ListPage({ params }: ListPageProps) {
  const { listId } = await params;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-bold tracking-tight">List Details</h1>
      <p className="text-sm text-zinc-600">List scaffold loaded successfully.</p>
      <section className="rounded-lg border border-zinc-200 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">List ID</h2>
        <p className="text-base font-medium">{listId}</p>
      </section>
    </main>
  );
}

