import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import type { User } from "@/types/user";

export const getUserOnServer = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const frontendUrl = process.env.FRONTEND_URL ?? "http://loclahost:3000";

  const res = await fetch(`${process.env.API_URL}/api/user`, {
    headers: {
      Accept: "application/json",
      Cookie: cookieHeader,
      Origin: frontendUrl,
      Referer: `${frontendUrl}/`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`認証確認に失敗しました (${res.status})`);
  }

  return res.json() as Promise<User>;
});
