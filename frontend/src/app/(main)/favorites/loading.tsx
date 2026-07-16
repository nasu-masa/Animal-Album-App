export default function FavoritesLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 h-8 w-32 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <div className="aspect-video animate-pulse bg-gray-200" />
            <div className="space-y-2 p-3">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
