import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import FavoriteButton from "@/components/media/FavoriteButton";
import {
  addFavorite,
  FavoriteAuthenticationError,
  removeFavorite,
} from "@/lib/media";

const refresh = vi.fn();
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

vi.mock("@/lib/media", () => ({
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
  FavoriteAuthenticationError: class FavoriteAuthenticationError extends Error {},
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("お気に入りを登録・解除できる", async () => {
  const user = userEvent.setup();
  const mediaId = 42;

  render(
    <FavoriteButton
      mediaId={mediaId}
      isFavorited={false}
      isLoggedIn={true}
    />,
  );

  await user.click(screen.getByRole("button", { name: "お気に入りに追加" }));

  expect(addFavorite).toHaveBeenCalledWith(mediaId);
  expect(
    screen.getByRole("button", { name: "お気に入りから削除" }),
  ).toBeVisible();

  await user.click(
    screen.getByRole("button", { name: "お気に入りから削除" }),
  );

  expect(removeFavorite).toHaveBeenCalledWith(mediaId);
  expect(
    screen.getByRole("button", { name: "お気に入りに追加" }),
  ).toBeVisible();
});

test("お気に入り登録時の認証エラーでログイン画面へ遷移する", async () => {
  const user = userEvent.setup();
  const mediaId = 42;

  vi.mocked(addFavorite).mockRejectedValueOnce(
    new FavoriteAuthenticationError(),
  );

  render(
    <FavoriteButton
      mediaId={mediaId}
      isFavorited={false}
      isLoggedIn={true}
    />,
  );

  await user.click(screen.getByRole("button", { name: "お気に入りに追加" }));

  expect(addFavorite).toHaveBeenCalledWith(mediaId);
  expect(push).toHaveBeenCalledWith("/login");
  expect(
    screen.getByRole("button", { name: "お気に入りに追加" }),
  ).toBeVisible();
});
