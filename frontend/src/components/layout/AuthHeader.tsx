import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="border-b border-orange-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold text-amber-600"
        >
          <span>🐾</span>
          <span>Animal Album</span>
        </Link>
      </div>
    </header>
  );
}
