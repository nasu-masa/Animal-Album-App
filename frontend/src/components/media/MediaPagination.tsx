import Link from "next/link";
import { createMediaListHref } from "@/lib/mediaListUrl";
import type { MediaListParams } from "@/types/media";

type Props = {
  currentPage: number;
  lastPage: number;
  params: MediaListParams;
  basePath?: string;
  queryParams?: Record<string, string>;
};

export default function MediaPagination({
  currentPage,
  lastPage,
  params,
  basePath = "/",
  queryParams = {},
}: Props) {
  function createPageHref(page: number): string {
    const href = createMediaListHref(params, page);
    const searchParams = new URLSearchParams(href.split("?")[1] ?? "");

    for (const [key, value] of Object.entries(queryParams)) {
      searchParams.set(key, value);
    }

    searchParams.delete("page");
    if (page > 1) {
      searchParams.set("page", String(page));
    }

    const query = searchParams.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  return (
    <nav
      aria-label="メディア一覧のページネーション"
      className="mt-8 flex items-center justify-center gap-4 text-sm"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageHref(currentPage - 1)}
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
          href={createPageHref(currentPage + 1)}
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
