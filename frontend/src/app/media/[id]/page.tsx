import { notFound } from "next/navigation";
import Link from "next/link";
import { mockMedia } from "@/mocks/media";
import MediaPreview from "@/components/media/MediaPreview";
import type { MediaType } from "@/types/media";
import { categoryLabels } from "@/constants/media";

const typeLabel: Record<MediaType, string> = {
  image: "画像",
  video: "動画",
};

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const media = mockMedia.find((m) => m.id === Number(id));

  if (!media) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <Link
        href="/media"
        className="mb-6 inline-block text-sm text-amber-600 hover:underline"
      >
        ← 一覧に戻る
      </Link>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {media.type === "video" ? (
          <video
            controls
            src={media.filePath}
            className="w-full aspect-video"
          />
        ) : (
          <MediaPreview
            type={media.type}
            filePath={media.filePath}
            alt={media.memo ?? ""}
          />
        )}

        <dl className="divide-y divide-gray-100 p-4 text-sm">
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">種別</dt>
            <dd className="text-gray-900">{typeLabel[media.type]}</dd>
          </div>
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">カテゴリ</dt>
            <dd className="text-gray-900">
              {categoryLabels[media.category] ?? media.category}
            </dd>
          </div>
          <div className="flex py-3">
            <dt className="w-24 shrink-0 text-gray-500">撮影日</dt>
            <dd className="text-gray-900">{media.takenAt ?? "不明"}</dd>
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
