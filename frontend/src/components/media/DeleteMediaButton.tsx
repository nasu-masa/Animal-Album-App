"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMedia } from "@/lib/media";

type Props = {
  mediaId: number;
};

export default function DeleteMediaButton({ mediaId }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      await deleteMedia(mediaId);
      router.replace("/media");
    } catch (err) {
      setError(err instanceof Error ? err.message : "削除に失敗しました。");
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        削除
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !deleting)
              setIsModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 id="delete-dialog-title" className="mb-2 text-lg font-bold">
              このメディアを削除しますか？
            </h2>
            <p id="delete-dialog-description">
              削除後は一覧に表示されなくなります。
            </p>

            {error && (
              <p
                role="alert"
                className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
              >
                {deleting ? "削除中..." : "削除する"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={deleting}
                className="w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 sm:flex-1"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
