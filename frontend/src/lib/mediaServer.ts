import "server-only";
import { cookies } from "next/headers";
import { API_TIMEOUT_MS } from "@/constants/api";
import type {
  ApiMedia,
  ApiMediaListResponse,
  Media,
  MediaListParams,
  MediaListResult,
} from "@/types/media";

function toMedia(api: ApiMedia): Media {
  return {
    id: api.id,
    type: api.type,
    filePath: api.file_path,
    category: api.category,
    takenAt: api.taken_at,
    memo: api.memo,
    user: api.user,
    isFavorited: api.is_favorited,
  };
}

async function buildHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

  return {
    Accept: "application/json",
    Cookie: cookieHeader,
    Origin: frontendUrl,
    Referer: `${frontendUrl}/`,
  };
}

export async function fetchMediaListOnServer(
  params?: MediaListParams,
): Promise<MediaListResult> {
  const headers = await buildHeaders();

  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }
  const qs = searchParams.toString();

  const res = await fetch(
    `${process.env.API_URL}/api/media${qs ? `?${qs}` : ""}`,
    {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    },
  );

  if (!res.ok) {
    throw new Error(`メディア一覧の取得に失敗しました (${res.status})`);
  }

  const data = (await res.json()) as ApiMediaListResponse;
  return {
    media: data.data.map(toMedia),
    meta: data.meta,
  };
}

export async function fetchMediaDetailOnServer(id: string): Promise<Media | null> {
  const headers = await buildHeaders();
  const res = await fetch(`${process.env.API_URL}/api/media/${id}`, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`メディア詳細の取得に失敗しました (${res.status})`);
  }

  const data = (await res.json()) as { data: ApiMedia };
  return toMedia(data.data);
}

export async function fetchMyMediaListOnServer(
  page: number = 1,
): Promise<MediaListResult> {
  const headers = await buildHeaders();
  const res = await fetch(`${process.env.API_URL}/api/media/mine?page=${page}`, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`自分の投稿一覧の取得に失敗しました (${res.status})`);
  }

  const data = (await res.json()) as ApiMediaListResponse;
  return {
    media: data.data.map(toMedia),
    meta: data.meta,
  };
}

export async function fetchFavoriteListOnServer(
  page: number = 1,
): Promise<MediaListResult> {
  const headers = await buildHeaders();
  const res = await fetch(`${process.env.API_URL}/api/favorites?page=${page}`, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`お気に入り一覧の取得に失敗しました (${res.status})`);
  }

  const data = (await res.json()) as ApiMediaListResponse;
  return {
    media: data.data.map(toMedia),
    meta: data.meta,
  };
}
