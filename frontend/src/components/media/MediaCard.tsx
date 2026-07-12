import Link from "next/link";
import type { Media } from "@/types/media";
import MediaPreview from "./MediaPreview";
import { categoryLabels } from "@/constants/media";

type Props = {
  media: Media;
  eager?: boolean;
};

export default function MediaCard({ media, eager }: Props) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link href={`/media/${media.id}`} className="block">
        <MediaPreview
          type={media.type}
          filePath={media.filePath}
          alt={media.memo ?? "動物の写真"}
          eager={eager}
        />

        <div className="space-y-1 p-3">
          <p className="text-xs text-gray-400">
            {categoryLabels[media.category] ?? media.category}
          </p>
          <p className="text-sm text-gray-500">
            撮影日：{media.takenAt ?? "不明"}
          </p>
          <p className="text-sm text-gray-700">{media.memo ?? "メモなし"}</p>
        </div>
      </Link>
    </article>
  );
}
