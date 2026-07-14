"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { categoryLabels } from "@/constants/media";
import { uploadMedia, UploadValidationError } from "@/lib/media";
import { extractTakenAt } from "@/lib/exif";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

type FormState = {
  file: File | null;
  category: string;
  takenAt: string;
  memo: string;
};

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    file: null,
    category: "",
    takenAt: "",
    memo: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [commonError, setCommonError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (file && file.size > MAX_FILE_SIZE) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setForm((prev) => ({ ...prev, file: null }));
      setPreviewUrl(null);
      setFieldErrors((prev) => ({
        ...prev,
        file: "ファイルサイズは100MB以下にしてください。",
      }));

      e.target.value = "";
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setForm((prev) => ({ ...prev, file }));
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setFieldErrors((prev) => ({ ...prev, file: "" }));
    if (file) {
      extractTakenAt(file).then((date) => {
        setForm((prev) => ({ ...prev, takenAt: date }));
      });
    }
  }

  function handleOpenModal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setCommonError("");

    const errors: Record<string, string> = {};
    if (!form.file) errors.file = "ファイルを選択してください";
    if (!form.category) errors.category = "カテゴリを選択してください";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setIsModalOpen(true);
  }

  async function handleUpload() {
    if (!form.file) return;
    setUploading(true);
    setCommonError("");

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("category", form.category);
    if (form.takenAt) formData.append("taken_at", form.takenAt);
    if (form.memo) formData.append("memo", form.memo);

    try {
      await uploadMedia(formData);
      router.replace("/media");
    } catch (error) {
      if (error instanceof UploadValidationError) {
        const first: Record<string, string> = {};
        for (const [field, messages] of Object.entries(error.errors)) {
          const msg = messages[0];
          if (msg) first[field] = msg;
        }
        setFieldErrors(first);
        setIsModalOpen(false);
      } else {
        setCommonError(
          error instanceof Error
            ? error.message
            : "アップロードに失敗しました。時間をおいて再度お試しください。",
        );
      }
    } finally {
      setUploading(false);
    }
  }

  const isVideo = form.file?.type.startsWith("video/") ?? false;

  return (
    <main className="mx-auto w-full max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">アップロード</h1>

      {commonError && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {commonError}
        </p>
      )}

      <form onSubmit={handleOpenModal} noValidate className="space-y-5">
        {/* ファイル */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            ファイル
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-sm text-gray-500 hover:border-orange-400 hover:text-orange-500"
          >
            {form.file ? form.file.name : "クリックしてファイルを選択"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {fieldErrors.file && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {fieldErrors.file}
            </p>
          )}
        </div>

        {/* プレビュー */}
        {previewUrl && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            {isVideo ? (
              <video src={previewUrl} controls className="w-full" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="プレビュー"
                className="w-full object-contain"
              />
            )}
          </div>
        )}

        {/* カテゴリ */}
        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            カテゴリ
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, category: e.target.value }));
              setFieldErrors((prev) => ({ ...prev, category: "" }));
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          >
            <option value="">選択してください</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldErrors.category && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {fieldErrors.category}
            </p>
          )}
        </div>

        {/* 撮影日 */}
        <div>
          <label
            htmlFor="takenAt"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            撮影日
          </label>
          <input
            id="takenAt"
            type="date"
            value={form.takenAt}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, takenAt: e.target.value }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          {fieldErrors.taken_at && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {fieldErrors.taken_at}
            </p>
          )}
        </div>

        {/* メモ */}
        <div>
          <label
            htmlFor="memo"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            メモ
          </label>
          <textarea
            id="memo"
            rows={3}
            value={form.memo}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, memo: e.target.value }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          {fieldErrors.memo && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {fieldErrors.memo}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 hover:cursor-pointer"
        >
          内容を確認
        </button>
      </form>

      {/* 確認モーダル */}
      {isModalOpen && form.file && previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:shadow-xl max-h-[90dvh]">
            <h2 className="mb-4 text-lg font-bold">アップロード内容の確認</h2>

            {commonError && (
              <p
                role="alert"
                className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {commonError}
              </p>
            )}

            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              {isVideo ? (
                <video src={previewUrl} controls className="w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="プレビュー"
                  className="w-full object-contain"
                />
              )}
            </div>

            <dl className="mb-6 divide-y divide-gray-100 text-sm">
              <div className="flex py-2">
                <dt className="w-24 shrink-0 text-gray-500">ファイル名</dt>
                <dd className="break-all text-gray-900">{form.file.name}</dd>
              </div>
              <div className="flex py-2">
                <dt className="w-24 shrink-0 text-gray-500">カテゴリ</dt>
                <dd className="text-gray-900">
                  {categoryLabels[form.category] ?? form.category}
                </dd>
              </div>
              <div className="flex py-2">
                <dt className="w-24 shrink-0 text-gray-500">撮影日</dt>
                <dd className="text-gray-900">{form.takenAt || "未設定"}</dd>
              </div>
              <div className="flex py-2">
                <dt className="w-24 shrink-0 text-gray-500">メモ</dt>
                <dd className="whitespace-pre-wrap text-gray-900">
                  {form.memo || "なし"}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
              >
                {uploading ? "アップロード中..." : "アップロードする"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={uploading}
                className="w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 sm:flex-1"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
