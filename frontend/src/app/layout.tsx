import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { getUserOnServer } from "@/lib/authServer";

export const metadata: Metadata = {
  title: "Animal Album",
  description: "みんなで使う動物の写真・動画アルバム",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserOnServer();

  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col bg-orange-50 text-gray-900">
        <MainHeader user={user} />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
