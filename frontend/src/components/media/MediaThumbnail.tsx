"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/types/media";

type Props = {
  type: Media["type"];
  filePath: string;
  alt: string;
  eager?: boolean;
};

export default function MediaThumbnail({ type, filePath, alt, eager = false }: Props) {
  const [hasError, setHasError] = useState(false);

  if (type === "video") {
    if (!filePath || hasError) {
      return (
        <div className="flex aspect-video items-center justify-center bg-gray-100 text-sm text-gray-400">
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
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 0.1;
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
      <div className="flex aspect-video items-center justify-center bg-gray-100 text-sm text-gray-400">
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
        unoptimized={process.env.NODE_ENV === "development"}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
