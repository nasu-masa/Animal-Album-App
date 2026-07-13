import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Animal Album",
  description: "みんなで使う動物の写真・動画アルバム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col bg-orange-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
