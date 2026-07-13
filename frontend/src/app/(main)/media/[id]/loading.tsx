export default function MediaDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="mb-6 h-4 w-24 animate-pulse rounded bg-gray-200" />

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="aspect-video animate-pulse bg-gray-200" />

        <dl className="divide-y divide-gray-100 p-4 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex py-3">
              <div className="w-24 shrink-0">
                <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
