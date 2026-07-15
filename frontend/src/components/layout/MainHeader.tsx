import Link from "next/link";
import LogoutButton from "@/components/layout/LogoutButton";
import type { User } from "@/types/user";

type Props = {
  user: User | null;
};

export default function MainHeader({ user }: Props) {
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
          <Link
            href="/upload"
            className="rounded-full bg-amber-400 px-4 py-1.5 font-medium text-white hover:bg-amber-500"
          >
            アップロード
          </Link>
          <Link
            href={user ? "/favorites" : "/login"}
            className="text-gray-600 hover:text-amber-600"
          >
            お気に入り
          </Link>
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-amber-600">
                ログイン
              </Link>
              <Link
                href="/register"
                className="text-gray-600 hover:text-amber-600"
              >
                新規登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
