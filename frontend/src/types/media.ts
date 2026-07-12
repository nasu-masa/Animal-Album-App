export type MediaType = "image" | "video";

export type MediaCategory = "my_cat" | "other_cat";

export type Media = {
  id: number;
  type: MediaType;
  filePath: string;
  category: MediaCategory;
  takenAt: string | null;
  memo: string | null;
};
