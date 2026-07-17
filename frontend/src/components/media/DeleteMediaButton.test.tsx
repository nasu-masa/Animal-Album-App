import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import DeleteMediaButton from "@/components/media/DeleteMediaButton";
import { deleteMedia } from "@/lib/media";

const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

vi.mock("@/lib/media", () => ({
  deleteMedia: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test("削除確認後に対象メディアを削除できる", async () => {
  const user = userEvent.setup();
  const mediaId = 42;

  render(<DeleteMediaButton mediaId={mediaId} />);

  await user.click(screen.getByRole("button", { name: "削除" }));

  const dialog = screen.getByRole("dialog", {
    name: "このメディアを削除しますか？",
  });
  expect(dialog).toBeVisible();

  await user.click(
    screen.getByRole("button", { name: "削除する" }),
  );

  expect(deleteMedia).toHaveBeenCalledWith(mediaId);
  await waitFor(() => {
    expect(replace).toHaveBeenCalledWith("/");
  });
});

test("削除確認をキャンセルできる", async () => {
  const user = userEvent.setup();

  render(<DeleteMediaButton mediaId={42} />);

  await user.click(screen.getByRole("button", { name: "削除" }));

  const dialog = screen.getByRole("dialog", {
    name: "このメディアを削除しますか？",
  });
  expect(dialog).toBeVisible();

  await user.click(within(dialog).getByRole("button", { name: "キャンセル" }));

  expect(
    screen.queryByRole("dialog", {
      name: "このメディアを削除しますか？",
    }),
  ).not.toBeInTheDocument();
  expect(deleteMedia).not.toHaveBeenCalled();
  expect(replace).not.toHaveBeenCalled();
});
