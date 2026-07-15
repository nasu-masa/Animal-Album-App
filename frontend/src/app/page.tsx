import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import { fetchMediaList } from "@/lib/media";

export default async function Home() {
  const mediaList = await fetchMediaList();

  if (mediaList.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center">
        <p className="mb-4 text-gray-700">まだ写真や動画がありません</p>
        <Link href="/upload" className="text-sm text-amber-600 hover:underline">
          アップロードする
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">写真一覧</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mediaList.map((media, index) => (
          <MediaCard key={media.id} media={media} eager={index === 0} />
        ))}
      </div>
    </main>
  );
}
