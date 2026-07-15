import Link from "next/link";
import type { Media } from "@/types/media";
import MediaThumbnail from "./MediaThumbnail";
import FavoriteButton from "./FavoriteButton";
import { categoryLabels } from "@/constants/media";

type Props = {
  media: Media;
  isLoggedIn: boolean;
  eager?: boolean;
};

export default function MediaCard({ media, isLoggedIn, eager }: Props) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link href={`/media/${media.id}`} className="block">
        <MediaThumbnail
          type={media.type}
          filePath={media.filePath}
          alt={media.memo ?? "動物の写真"}
          eager={eager}
        />
      </Link>

      <div className="flex items-center justify-between border-t border-orange-100 bg-orange-50/70 px-3 py-2">
        <span className="text-sm font-medium text-gray-600">
          {categoryLabels[media.category] ?? media.category}
        </span>

        <FavoriteButton
          mediaId={media.id}
          isFavorited={media.isFavorited}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </article>
  );
}
