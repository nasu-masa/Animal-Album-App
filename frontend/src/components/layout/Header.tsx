import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-orange-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold text-amber-600"
        >
          <span>🐾</span>
          <span>Animal Album</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="/media" className="text-gray-600 hover:text-amber-600">
            一覧
          </Link>
          <Link
            href="/favorites"
            className="text-gray-600 hover:text-amber-600"
          >
            お気に入り
          </Link>
          <Link
            href="/upload"
            className="rounded-full bg-amber-400 px-4 py-1.5 font-medium text-white hover:bg-amber-500"
          >
            アップロード
          </Link>
        </nav>
      </div>
    </header>
  );
}
