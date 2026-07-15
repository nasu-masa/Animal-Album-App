import { notFound } from "next/navigation";
import Link from "next/link";
import MediaDetailPreview from "@/components/media/MediaDetailPreview";
import DeleteMediaButton from "@/components/media/DeleteMediaButton";
import FavoriteButton from "@/components/media/FavoriteButton";
import { categoryLabels } from "@/constants/media";
import { fetchMediaDetailOnServer } from "@/lib/mediaServer";
import { formatDate } from "@/lib/date";
import { getUserOnServer } from "@/lib/authServer";

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [media, currentUser] = await Promise.all([
    fetchMediaDetailOnServer(id),
    getUserOnServer(),
  ]);
  if (!media) {
    notFound();
  }

  const canDelete = currentUser !== null && media.user.id === currentUser.id;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-sm text-amber-600 hover:underline"
        >
          ← 一覧に戻る
        </Link>
        {canDelete && <DeleteMediaButton mediaId={media.id} />}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <MediaDetailPreview
          type={media.type}
          filePath={media.filePath}
          alt={media.memo ?? ""}
        />

        <div className="flex items-center justify-end border-t border-gray-100 px-4 py-2">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <FavoriteButton
              mediaId={media.id}
              isFavorited={media.isFavorited}
              isLoggedIn={currentUser !== null}
            />
            <span>お気に入り</span>
          </div>
        </div>

        <dl className="divide-y divide-gray-100 px-4 pb-4 text-sm">
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">カテゴリ</dt>
            <dd className="text-gray-900">
              {categoryLabels[media.category] ?? media.category}
            </dd>
          </div>
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">撮影日</dt>
            <dd className="text-gray-900">{formatDate(media.takenAt)}</dd>
          </div>
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">メモ</dt>
            <dd className="text-gray-900">{media.memo ?? "メモなし"}</dd>
          </div>
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">投稿者</dt>
            <dd className="text-gray-900">{media.user.name}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
