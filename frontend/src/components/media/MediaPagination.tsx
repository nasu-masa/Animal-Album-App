import Link from "next/link";
import { createMediaListHref } from "@/lib/mediaListUrl";
import type { MediaListParams } from "@/types/media";

type Props = {
  currentPage: number;
  lastPage: number;
  params: MediaListParams;
};

export default function MediaPagination({
  currentPage,
  lastPage,
  params,
}: Props) {
  return (
    <nav
      aria-label="メディア一覧のページネーション"
      className="mt-8 flex items-center justify-center gap-4 text-sm"
    >
      {currentPage > 1 ? (
        <Link
          href={createMediaListHref(params, currentPage - 1)}
          className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-amber-700 hover:bg-orange-50"
        >
          ← 前へ
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-gray-300">
          ← 前へ
        </span>
      )}

      <span className="text-gray-600">
        {currentPage} / {lastPage}
      </span>

      {currentPage < lastPage ? (
        <Link
          href={createMediaListHref(params, currentPage + 1)}
          className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-amber-700 hover:bg-orange-50"
        >
          次へ →
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-gray-300">
          次へ →
        </span>
      )}
    </nav>
  );
}
