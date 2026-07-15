import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import { fetchFavoriteListOnServer } from "@/lib/mediaServer";

export default async function FavoritesPage() {
  const mediaList = await fetchFavoriteListOnServer();

  if (mediaList.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center">
        <p className="mb-4 text-gray-700">お気に入りはまだありません</p>
        <Link href="/" className="text-sm text-amber-600 hover:underline">
          写真一覧を見る
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">お気に入り</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mediaList.map((media, index) => (
          <MediaCard
            key={media.id}
            media={media}
            isLoggedIn={true}
            eager={index === 0}
          />
        ))}
      </div>
    </main>
  );
}
