"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/types/media";

type Props = {
  type: Media["type"];
  filePath: string;
  alt: string;
};

export default function MediaPreview({ type, filePath, alt }: Props) {
  const [hasError, setHasError] = useState(false);

  if (type === "video") {
    if (!filePath || hasError) {
      return (
        <div className="flex items-center justify-center aspect-video bg-gray-100 text-gray-400 text-sm">
          動画を表示できません
        </div>
      );
    }
    return (
      <div className="relative aspect-video">
        <video
          src={filePath}
          muted
          playsInline
          preload="metadata"
          className="pointer-events-none h-full w-full object-cover"
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 0.1;
          }}
          onError={() => setHasError(true)}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white">
            ▶
          </span>
        </div>
      </div>
    );
  }

  if (!filePath || hasError) {
    return (
      <div className="flex items-center justify-center aspect-video bg-gray-100 text-gray-400 text-sm">
        画像がありません
      </div>
    );
  }

  return (
    <div className="relative aspect-video">
      <Image
        src={filePath}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
