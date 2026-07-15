"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categoryGroups } from "@/constants/media";

export default function MediaFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");

    const query = params.toString();
    router.replace(query ? `/?${query}` : "/");
  }

  const selectClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 sm:w-auto";

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <select
        value={searchParams.get("category") ?? ""}
        onChange={(e) => updateParam("category", e.target.value)}
        className={selectClass}
      >
        <option value="">すべてのカテゴリ</option>
        {categoryGroups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <select
        value={searchParams.get("type") ?? ""}
        onChange={(e) => updateParam("type", e.target.value)}
        className={selectClass}
      >
        <option value="">すべての種類</option>
        <option value="image">画像</option>
        <option value="video">動画</option>
      </select>

      <select
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => updateParam("sort", e.target.value)}
        className={selectClass}
      >
        <option value="">新しい順</option>
        <option value="asc">古い順</option>
      </select>
    </div>
  );
}
