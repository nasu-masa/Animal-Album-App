import { redirect } from "next/navigation";
import { getUserOnServer } from "@/lib/authServer";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserOnServer();

  if (user !== null) {
    redirect("/");
  }

  return children;
}
