import type { Media } from "@/types/media";

export const mockMedia: Media[] = [
  {
    id: 1,
    type: "image",
    filePath: "/images/cat-1.jpg",
    category: "my_cat",
    takenAt: "2026-07-01",
    memo: "窓辺で昼寝している写真",
  },
  {
    id: 2,
    type: "image",
    filePath: "/images/cat-2.jpg",
    category: "my_cat",
    takenAt: "2026-07-03",
    memo: "お気に入りのクッションでくつろいでいる",
  },
  {
    id: 3,
    type: "video",
    filePath: "/videos/cat-1.mp4",
    category: "my_cat",
    takenAt: "2026-07-05",
    memo: "おもちゃで遊んでいる動画",
  },
  {
    id: 4,
    type: "image",
    filePath: "/images/cat-3.jpg",
    category: "other_cat",
    takenAt: "2026-06-28",
    memo: "近所で見かけた猫",
  },
  {
    id: 5,
    type: "image",
    filePath: "/images/cat-4.jpg",
    category: "other_cat",
    takenAt: null,
    memo: null,
  },
  {
    id: 6,
    type: "video",
    filePath: "/videos/cat-2.mp4",
    category: "other_cat",
    takenAt: "2026-06-20",
    memo: "公園を歩いている猫の動画",
  },
];

