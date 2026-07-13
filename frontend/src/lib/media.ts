import axios from "axios";

import apiClient from "@/lib/apiClient";
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
  try {
    const res = await apiClient.get<ApiMediaListResponse>("/api/media");
    return res.data.data.map(toMedia);
  } catch {
    throw new Error("メディア一覧の取得に失敗しました");
  }
}

export async function fetchMediaDetail(id: string): Promise<Media | null> {
  try {
    const res = await apiClient.get<{ data: ApiMedia }>(`/api/media/${id}`);
    return toMedia(res.data.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw new Error("メディア詳細の取得に失敗しました");
  }
}
