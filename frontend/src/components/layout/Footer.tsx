import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-orange-100 bg-white px-4 py-4 text-center text-sm text-gray-400">
      <p>みんなで楽しむアニマルアルバム</p>
      <nav aria-label="法務情報" className="mt-2 flex justify-center gap-4">
        <Link href="/privacy" className="transition-colors hover:text-amber-600">
          プライバシーポリシー
        </Link>
        <Link href="/terms" className="transition-colors hover:text-amber-600">
          利用規約
        </Link>
      </nav>
      <p className="mt-2">
        © {currentYear === 2026 ? "2026" : `2026 - ${currentYear}`} Animal Album
      </p>
    </footer>
  );
}
