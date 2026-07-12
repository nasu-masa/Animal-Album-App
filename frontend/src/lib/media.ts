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
  };
}

export async function fetchMediaList(): Promise<Media[]> {
  const baseUrl = process.env.API_URL;
  const res = await fetch(`${baseUrl}/api/media`);
  if (!res.ok) {
    throw new Error(`メディア一覧の取得に失敗しました (${res.status})`);
  }
  const json: ApiMediaListResponse = await res.json();
  return json.data.map(toMedia);
}
