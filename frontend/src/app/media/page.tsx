import Image from "next/image";
import { mockMedia } from "@/mocks/media";

export default function MediaPage() {
  return (
    <main>
      <h1>写真一覧</h1>

      <div>
        {mockMedia.map((media) => (
          <article key={media.id}>
            {media.type === "image" ? (
              <Image
                src={media.filePath}
                alt={media.memo ?? "猫の写真"}
                width={300}
                height={200}
              />
            ) : (
              <video src={media.filePath} controls width={300} />
            )}

            <p>{media.category}</p>
            <p>{media.takenAt ?? "撮影日 不明"}</p>
            <p>{media.memo ?? "メモなし"}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
