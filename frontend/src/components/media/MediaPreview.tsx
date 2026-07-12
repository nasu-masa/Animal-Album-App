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

  if (!filePath || hasError) {
    return (
      <div className="flex items-center justify-center aspect-video bg-gray-100 text-gray-400 text-sm">
        {type === "image" ? "画像がありません" : "動画がありません"}
      </div>
    );
  }

  if (type === "video") {
    return (
      <video
        controls
        src={filePath}
        className="w-full aspect-video object-cover"
        onError={() => setHasError(true)}
      />
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
