import { notFound } from "next/navigation";
import { features } from "@/constants/features";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!features.registration) {
    notFound();
  }

  return children;
}
