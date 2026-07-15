"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addFavorite,
  FavoriteAuthenticationError,
  removeFavorite,
} from "@/lib/media";

type Props = {
  mediaId: number;
  isFavorited: boolean;
  isLoggedIn: boolean;
};

export default function FavoriteButton({
  mediaId,
  isFavorited: initialIsFavorited,
  isLoggedIn,
}: Props) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (loading) return;
    setLoading(true);
    setError("");

    try {
      if (isFavorited) {
        await removeFavorite(mediaId);
        setIsFavorited(false);
        router.refresh();
      } else {
        await addFavorite(mediaId);
        setIsFavorited(true);
      }
    } catch (error) {
      if (error instanceof FavoriteAuthenticationError) {
        router.push("/login");
        return;
      }
      setError("お気に入りの更新に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-label={isFavorited ? "お気に入りから削除" : "お気に入りに追加"}
        className={`rounded-full p-1.5 text-xl leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          isFavorited
            ? "text-amber-500 hover:text-amber-600"
            : "text-gray-300 hover:text-amber-400"
        }`}
      >
        <span className="inline-block scale-125">
          {isFavorited ? "♥" : "♡"}
        </span>
      </button>
      {error && (
        <span
          role="alert"
          className="absolute right-0 top-full z-10 mt-1 w-max max-w-56 rounded bg-white px-2 py-1 text-xs text-red-600 shadow"
        >
          {error}
        </span>
      )}
    </span>
  );
}
