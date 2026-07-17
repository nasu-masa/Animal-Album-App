import Link from "next/link";
import LogoutButton from "@/components/layout/LogoutButton";
import { features } from "@/constants/features";
import type { User } from "@/types/user";

type Props = {
  user: User | null;
};

export default function MainHeader({ user }: Props) {
  const navigation = (
    <>
      {features.mediaUpload && (
        <Link
          href="/upload"
          className="rounded-full bg-amber-400 px-4 py-1.5 text-center font-medium text-white hover:bg-amber-500"
        >
          アップロード
        </Link>
      )}
      <Link
        href={user ? "/mypage" : "/login"}
        className="text-gray-600 hover:text-amber-600"
      >
        マイページ
      </Link>
      {user ? (
        <LogoutButton />
      ) : (
        <>
          <Link href="/login" className="text-gray-600 hover:text-amber-600">
            ログイン
          </Link>
          {features.registration && (
            <Link
              href="/register"
              className="text-gray-600 hover:text-amber-600"
            >
              新規登録
            </Link>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-10 border-b border-orange-100 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold text-amber-600"
        >
          <span>🐾</span>
          <span>Animal Album</span>
        </Link>

        <nav className="hidden items-center gap-3 text-sm md:flex">
          {navigation}
        </nav>

        <details className="group md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-lg p-2 text-gray-600 hover:bg-amber-50 hover:text-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">メニューを開く</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <nav className="absolute top-full right-4 mt-2 flex min-w-44 flex-col gap-3 rounded-xl border border-orange-100 bg-white p-4 text-sm shadow-lg">
            {navigation}
          </nav>
        </details>
      </div>
    </header>
  );
}
