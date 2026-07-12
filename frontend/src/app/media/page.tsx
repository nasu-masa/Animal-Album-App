import MediaCard from "@/components/media/MediaCard";
import { mockMedia } from "@/mocks/media";

export default function MediaPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">写真一覧</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockMedia.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
    </main>
  );
}
