import axios from "axios";

import apiClient from "@/lib/apiClient";
import { UPLOAD_TIMEOUT_MS } from "@/constants/api";

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
      Array.isArray(messages) && messages.every((m) => typeof m === "string"),
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

export class FavoriteAuthenticationError extends Error {}

export async function addFavorite(mediaId: number): Promise<void> {
  try {
    await apiClient.post(`/api/favorites/${mediaId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new FavoriteAuthenticationError();
      }
      if (error.response?.status === 404) {
        throw new Error("メディアが見つかりません。");
      }
    }
    throw new Error("お気に入り登録に失敗しました。");
  }
}

export async function removeFavorite(mediaId: number): Promise<void> {
  try {
    await apiClient.delete(`/api/favorites/${mediaId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new FavoriteAuthenticationError();
      }
      if (error.response?.status === 404) {
        throw new Error("メディアが見つかりません。");
      }
    }
    throw new Error("お気に入り解除に失敗しました。");
  }
}

export async function deleteMedia(id: number): Promise<void> {
  try {
    await apiClient.delete(`/api/media/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("削除する権限がありません。");
      }
      if (error.response?.status === 404) {
        throw new Error("メディアが見つかりません。");
      }
    }
    throw new Error("削除に失敗しました。時間をおいて再度お試しください。");
  }
}

export async function uploadMedia(formData: FormData): Promise<void> {
  try {
    await apiClient.post("/api/media", formData, {
      headers: { Accept: "application/json" },
      timeout: UPLOAD_TIMEOUT_MS,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        throw new Error(
          "通信に時間がかかっています。時間をおいてもう一度お試しください。",
        );
      }

      if (error.response?.status === 401) {
        throw new Error(
          "ログインの有効期限が切れました。再度ログインしてください。",
        );
      }

      if (error.response?.status === 413) {
        throw new Error(
          "ファイルサイズが大きすぎます。100MB以下のファイルを選択してください。",
        );
      }

      if (error.response?.status === 422) {
        const data: unknown = error.response.data;

        if (isValidationResponse(data)) {
          throw new UploadValidationError(data.message, data.errors ?? {});
        }

        throw new Error(
          "入力内容に誤りがあります。内容を確認してもう一度お試しください。",
        );
      }

      if (!error.response) {
        throw new Error(
          "サーバーとの通信に失敗しました。接続を確認してもう一度お試しください。",
        );
      }

      if (error.response.status >= 500) {
        throw new Error(
          "一時的な問題が発生しました。時間をおいてもう一度お試しください。",
        );
      }
    }

    throw new Error(
      "アップロードに失敗しました。内容を確認してもう一度お試しください。",
    );
  }
}
