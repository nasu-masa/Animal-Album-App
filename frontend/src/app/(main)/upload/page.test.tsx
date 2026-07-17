import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import UploadPage from "@/app/(main)/upload/page";
import { extractTakenAt } from "@/lib/exif";
import { uploadMedia } from "@/lib/media";

const replace = vi.fn();
const createObjectURL = vi.fn(() => "blob:test-preview");
const revokeObjectURL = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

vi.mock("@/lib/exif", () => ({
  extractTakenAt: vi.fn(),
}));

vi.mock("@/lib/media", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/media")>();

  return {
    ...actual,
    uploadMedia: vi.fn(),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(extractTakenAt).mockResolvedValue("2026-07-17");
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectURL,
  });
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    value: revokeObjectURL,
  });
});

afterEach(() => {
  Reflect.deleteProperty(URL, "createObjectURL");
  Reflect.deleteProperty(URL, "revokeObjectURL");
});

test("確認画面からメディアをアップロードできる", async () => {
  const user = userEvent.setup();
  const file = new File(["image data"], "animal.jpg", {
    type: "image/jpeg",
  });

  render(<UploadPage />);

  const fileInput = document.querySelector('input[type="file"]');
  expect(fileInput).toBeInstanceOf(HTMLInputElement);

  await user.upload(fileInput as HTMLInputElement, file);
  await user.selectOptions(screen.getByLabelText("カテゴリ"), "cat");
  await user.click(screen.getByRole("button", { name: "内容を確認" }));

  expect(
    screen.getByRole("heading", { name: "アップロード内容の確認" }),
  ).toBeVisible();

  await user.click(screen.getByRole("button", { name: "アップロードする" }));

  await waitFor(() => {
    expect(uploadMedia).toHaveBeenCalledTimes(1);
  });

  const formData = vi.mocked(uploadMedia).mock.calls[0]?.[0];
  expect(formData).toBeInstanceOf(FormData);
  expect(formData?.get("file")).toBe(file);
  expect(formData?.get("category")).toBe("cat");
  expect(replace).toHaveBeenCalledWith("/");
});

test("アップロードに失敗したときエラーメッセージを表示する", async () => {
  const user = userEvent.setup();
  const file = new File(["image data"], "animal.jpg", {
    type: "image/jpeg",
  });
  const errorMessage = "アップロードに失敗しました。";

  vi.mocked(uploadMedia).mockRejectedValueOnce(new Error(errorMessage));

  render(<UploadPage />);

  const fileInput = document.querySelector('input[type="file"]');
  expect(fileInput).toBeInstanceOf(HTMLInputElement);

  await user.upload(fileInput as HTMLInputElement, file);
  await user.selectOptions(screen.getByLabelText("カテゴリ"), "cat");
  await user.click(screen.getByRole("button", { name: "内容を確認" }));
  await user.click(screen.getByRole("button", { name: "アップロードする" }));

  await waitFor(() => {
    expect(uploadMedia).toHaveBeenCalledTimes(1);
  });

  const alerts = await screen.findAllByRole("alert");
  expect(alerts[0]).toHaveTextContent(errorMessage);
  expect(replace).not.toHaveBeenCalled();
});
