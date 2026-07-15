import type { MediaListParams } from "@/types/media";

export function createMediaListHref(
  params: MediaListParams,
  page: number,
): string {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.set("category", params.category);
  if (params.type) searchParams.set("type", params.type);
  if (params.sort) searchParams.set("sort", params.sort);
  if (page > 1) searchParams.set("page", String(page));

  const query = searchParams.toString();
  return query ? `/?${query}` : "/";
}
