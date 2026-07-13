import type { ApiMedia, ApiMediaListResponse, Media } from "@/types/media";

const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

function toMedia(api: ApiMedia): Media {
  return {
    id: api.id,
    type: api.type,
    filePath: api.file_path,
    category: api.category,
    takenAt: api.taken_at,
    memo: api.memo,
    user: api.user,
  };
}

export async function fetchMediaList(): Promise<Media[]> {
  const res = await fetch(`${baseUrl}/api/media`);
  if (!res.ok) {
    throw new Error(`メディア一覧の取得に失敗しました (${res.status})`);
  }
  const json: ApiMediaListResponse = await res.json();
  return json.data.map(toMedia);
}

export async function fetchMediaDetail(id: string): Promise<Media | null> {
  const res = await fetch(`${baseUrl}/api/media/${id}`, { cache: "no-store" });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`メディア詳細の取得に失敗しました (${res.status})`);
  }
  const json: { data: ApiMedia } = await res.json();
  return toMedia(json.data);
}
