import { redirect } from "next/navigation";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { getUserOnServer } from "@/lib/authServer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserOnServer();

  if (user === null) {
    redirect("/login");
  }

  return (
    <>
      <MainHeader />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
