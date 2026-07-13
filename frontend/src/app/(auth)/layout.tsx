import AuthHeader from "@/components/layout/AuthHeader";
import Footer from "@/components/layout/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
