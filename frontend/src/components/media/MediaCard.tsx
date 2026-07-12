import Link from "next/link";
import type { Media } from "@/types/media";
import MediaPreview from "./MediaPreview";

type Props = {
  media: Media;
};

export default function MediaCard({ media }: Props) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link href={`/media/${media.id}`} className="block">
        <MediaPreview
          type={media.type}
          filePath={media.filePath}
          alt={media.memo ?? "動物の写真"}
        />

        <div className="space-y-1 p-3">
          <p className="text-sm text-gray-500">
            撮影日：{media.takenAt ?? "不明"}
          </p>

          <p className="text-sm text-gray-700">{media.memo ?? "メモなし"}</p>
        </div>
      </Link>
    </article>
  );
}
