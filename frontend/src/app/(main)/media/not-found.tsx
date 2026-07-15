import Link from "next/link";

export default function MediaNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center">
      <p className="mb-4 text-gray-700">メディアが見つかりません</p>
      <Link href="/" className="text-sm text-amber-600 hover:underline">
        一覧に戻る
      </Link>
    </main>
  );
}
