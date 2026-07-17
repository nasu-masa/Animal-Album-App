import { redirect } from "next/navigation";
import { getUserOnServer } from "@/lib/authServer";

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactNode> {
  const user = await getUserOnServer();

  if (user === null) {
    redirect("/login");
  }

  return children;
}
