export type MediaType = "image" | "video";

export type MediaCategory = string;

export type MediaUser = {
  id: number;
  name: string;
};

export type Media = {
  id: number;
  type: MediaType;
  filePath: string;
  category: MediaCategory;
  takenAt: string | null;
  memo: string | null;
  user: MediaUser;
  isFavorited: boolean;
};

export type ApiMedia = {
  id: number;
  type: MediaType;
  file_path: string;
  category: MediaCategory;
  taken_at: string | null;
  memo: string | null;
  user: MediaUser;
  is_favorited: boolean;
};

export type ApiMediaListResponse = {
  data: ApiMedia[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};
