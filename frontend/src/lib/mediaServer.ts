import "server-only";
import { cookies } from "next/headers";
import type { ApiMedia, ApiMediaListResponse, Media } from "@/types/media";

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

export async function fetchMediaListOnServer(): Promise<Media[]> {
  const headers = await buildHeaders();
  const res = await fetch(`${process.env.API_URL}/api/media`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`メディア一覧の取得に失敗しました (${res.status})`);
  }

  const data = (await res.json()) as ApiMediaListResponse;
  return data.data.map(toMedia);
}

export async function fetchMediaDetailOnServer(id: string): Promise<Media | null> {
  const headers = await buildHeaders();
  const res = await fetch(`${process.env.API_URL}/api/media/${id}`, {
    headers,
    cache: "no-store",
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

export async function fetchFavoriteListOnServer(): Promise<Media[]> {
  const headers = await buildHeaders();
  const res = await fetch(`${process.env.API_URL}/api/favorites`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`お気に入り一覧の取得に失敗しました (${res.status})`);
  }

  const data = (await res.json()) as { data: ApiMedia[] };
  return data.data.map(toMedia);
}
