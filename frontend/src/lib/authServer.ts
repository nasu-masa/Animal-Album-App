import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { fetchApiOnServer } from "@/lib/serverFetch";
import type { User } from "@/types/user";

export type PublicUserResult =
  | { status: "authenticated"; user: User }
  | { status: "unauthenticated"; user: null }
  | { status: "unavailable"; user: null };

export const getUserOnServer = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

  const res = await fetchApiOnServer(`${process.env.API_URL}/api/user`, {
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

export const getUserForPublicPageOnServer = cache(
  async (): Promise<PublicUserResult> => {
    try {
      const user = await getUserOnServer();
      return user === null
        ? { status: "unauthenticated", user: null }
        : { status: "authenticated", user };
    } catch (error) {
      console.error("ページ用の認証情報を取得できませんでした。", error);
      return { status: "unavailable", user: null };
    }
  },
);
