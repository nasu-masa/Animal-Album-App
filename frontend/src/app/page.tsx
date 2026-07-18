import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import MediaCard from "@/components/media/MediaCard";
import MediaFilterBar from "@/components/media/MediaFilterBar";
import MediaPagination from "@/components/media/MediaPagination";
import { features } from "@/constants/features";
import { categoryLabels } from "@/constants/media";
import { fetchMediaListOnServer } from "@/lib/mediaServer";
import { getUserForPublicPageOnServer } from "@/lib/authServer";
import { createMediaListHref } from "@/lib/mediaListUrl";
import type {
  MediaCategory,
  MediaListParams,
  MediaListSort,
  MediaType,
} from "@/types/media";

type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  const result = Array.isArray(value) ? value[0] : value;
  return result || undefined;
}

function toCategory(value: string | undefined): MediaCategory | undefined {
  return value !== undefined && Object.prototype.hasOwnProperty.call(categoryLabels, value)
    ? (value as MediaCategory)
    : undefined;
}

function toType(value: string | undefined): MediaType | undefined {
  return value === "image" || value === "video" ? value : undefined;
}

function toSort(value: string | undefined): MediaListSort | undefined {
  return value === "asc" || value === "desc" ? value : undefined;
}

function toPage(value: string | undefined): number | undefined {
  if (!value || !/^[1-9]\d*$/.test(value)) return undefined;

  const page = Number(value);
  return Number.isSafeInteger(page) ? page : undefined;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const params: MediaListParams = {
    category: toCategory(firstValue(raw.category)),
    type: toType(firstValue(raw.type)),
    sort: toSort(firstValue(raw.sort)),
    page: toPage(firstValue(raw.page)),
  };

  const [{ media: mediaList, meta }, userResult] = await Promise.all([
    fetchMediaListOnServer(params),
    getUserForPublicPageOnServer(),
  ]);

  if (params.page && params.page > meta.last_page) {
    redirect(createMediaListHref(params, 1));
  }

  const isFiltered = params.category !== undefined || params.type !== undefined;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">写真一覧</h1>

      <Suspense>
        <MediaFilterBar />
      </Suspense>

      {mediaList.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          {isFiltered ? (
            <>
              <p className="mb-4 text-gray-700">条件に一致するメディアがありません</p>
              <Link href="/" className="text-sm text-amber-600 hover:underline">
                絞り込みを解除する
              </Link>
            </>
          ) : (
            <>
              <p className="mb-4 text-gray-700">まだ写真や動画がありません</p>
              {features.mediaUpload && (
                <Link
                  href="/upload"
                  className="text-sm text-amber-600 hover:underline"
                >
                  アップロードする
                </Link>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mediaList.map((media, index) => (
              <MediaCard
                key={media.id}
                media={media}
                isLoggedIn={userResult.user !== null}
                eager={index === 0}
              />
            ))}
          </div>

          {meta.last_page > 1 && (
            <MediaPagination
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              params={params}
            />
          )}
        </>
      )}
    </main>
  );
}
