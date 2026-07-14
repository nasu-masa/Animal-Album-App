"use client";

import { useState } from "react";
import type { Media } from "@/types/media";

type Props = {
  type: Media["type"];
  filePath: string;
  alt: string;
};

export default function MediaDetailPreview({ type, filePath, alt }: Props) {
  const [hasError, setHasError] = useState(false);

  if (type === "video") {
    if (!filePath || hasError) {
      return (
        <div className="flex max-h-[70vh] items-center justify-center bg-zinc-900 py-16 text-sm text-gray-400">
          動画を表示できません
        </div>
      );
    }
    return (
      <div className="flex max-h-[70vh] items-center justify-center overflow-hidden bg-zinc-900">
        <video
          controls
          src={filePath}
          className="max-h-[70vh] max-w-full object-contain"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  if (!filePath || hasError) {
    return (
      <div className="flex max-h-[70vh] items-center justify-center bg-zinc-900 py-16 text-sm text-gray-400">
        画像がありません
      </div>
    );
  }

  return (
    <div className="flex max-h-[70vh] items-center justify-center overflow-hidden bg-zinc-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={filePath}
        alt={alt}
        className="max-h-[70vh] max-w-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
