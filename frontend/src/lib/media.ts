import axios from "axios";

import apiClient from "@/lib/apiClient";
import type { ApiMedia, ApiMediaListResponse, Media } from "@/types/media";

type ValidationErrors = Record<string, string[]>;

export class UploadValidationError extends Error {
  errors: ValidationErrors;
  constructor(message: string, errors: ValidationErrors) {
    super(message);
    this.errors = errors;
  }
}

function isValidationErrors(value: unknown): value is ValidationErrors {
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value).every(
    (messages) =>
      Array.isArray(messages) &&
      messages.every((m) => typeof m === "string"),
  );
}

function isValidationResponse(
  data: unknown,
): data is { message: string; errors?: ValidationErrors } {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.message === "string" &&
    (d.errors === undefined || isValidationErrors(d.errors))
  );
}

export async function uploadMedia(formData: FormData): Promise<void> {
  try {
    await apiClient.post("/api/media", formData, {
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      const data: unknown = error.response.data;
      if (isValidationResponse(data)) {
        throw new UploadValidationError(data.message, data.errors ?? {});
      }
    }
    throw new Error("アップロードに失敗しました。時間をおいて再度お試しください。");
  }
}

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
