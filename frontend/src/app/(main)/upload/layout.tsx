import { notFound, redirect } from "next/navigation";
import { features } from "@/constants/features";
import { getUserOnServer } from "@/lib/authServer";

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!features.mediaUpload) {
    notFound();
  }

  const user = await getUserOnServer();

  if (user === null) {
    redirect("/login");
  }

  return children;
}
