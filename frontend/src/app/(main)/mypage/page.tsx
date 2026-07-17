import Link from "next/link";
import MediaCard from "@/components/media/MediaCard";
import MediaPagination from "@/components/media/MediaPagination";
import {
  fetchFavoriteListOnServer,
  fetchMyMediaListOnServer,
} from "@/lib/mediaServer";

type MyPageTab = "posts" | "favorites";

function toPage(value: string | string[] | undefined): number {
  const page = Array.isArray(value) ? value[0] : value;

  if (!page || !/^[1-9]\d*$/.test(page)) return 1;

  const parsed = Number(page);
  return Number.isSafeInteger(parsed) ? parsed : 1;
}

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string | string[];
    page?: string | string[];
  }>;
}) {
  const { tab: rawTab, page: rawPage } = await searchParams;
  const tabValue = Array.isArray(rawTab) ? rawTab[0] : rawTab;
  const tab: MyPageTab = tabValue === "favorites" ? "favorites" : "posts";
  const page = toPage(rawPage);
  const { media, meta } =
    tab === "favorites"
      ? await fetchFavoriteListOnServer(page)
      : await fetchMyMediaListOnServer(page);

  const tabs: { value: MyPageTab; label: string }[] = [
    { value: "posts", label: "自分の投稿" },
    { value: "favorites", label: "お気に入り" },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">マイページ</h1>

      <nav
        aria-label="マイページ"
        className="mb-6 flex border-b border-orange-200"
      >
        {tabs.map(({ value, label }) => {
          const isActive = tab === value;

          return (
            <Link
              key={value}
              href={`/mypage?tab=${value}`}
              aria-current={isActive ? "page" : undefined}
              className={`border-b-2 px-4 py-2 text-sm font-medium ${
                isActive
                  ? "border-amber-500 text-amber-700"
                  : "border-transparent text-gray-500 hover:border-orange-200 hover:text-amber-600"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {media.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-700">
            {tab === "favorites"
              ? "お気に入りはまだありません"
              : "まだ投稿がありません"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {media.map((item, index) => (
              <MediaCard
                key={item.id}
                media={item}
                isLoggedIn={true}
                eager={index === 0}
              />
            ))}
          </div>

          {meta.last_page > 1 && (
            <MediaPagination
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              params={{}}
              basePath="/mypage"
              queryParams={{ tab }}
            />
          )}
        </>
      )}
    </main>
  );
}
