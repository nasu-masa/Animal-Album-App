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
        <div className="relative">
          <MediaPreview
            type={media.type}
            filePath={media.filePath}
            alt={media.memo ?? "動物の写真"}
            eager={eager}
          />

          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {categoryLabels[media.category] ?? media.category}
          </span>
        </div>
      </Link>
    </article>
  );
}
