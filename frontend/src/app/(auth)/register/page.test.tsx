import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";

import RegisterPage from "@/app/(auth)/register/page";
import { register, RegisterValidationError } from "@/lib/auth";

const replace = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, refresh }),
}));

vi.mock("@/lib/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/auth")>();

  return {
    ...actual,
    register: vi.fn(),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test("新規登録の422エラーをメールアドレス欄に表示する", async () => {
  const user = userEvent.setup();
  const emailError = "このメールアドレスは既に使用されています。";

  vi.mocked(register).mockRejectedValue(
    new RegisterValidationError("入力内容に誤りがあります。", {
      email: [emailError, "別のメールアドレスを入力してください。"],
    }),
  );

  render(<RegisterPage />);

  await user.type(screen.getByLabelText("名前"), "E2E Test User");
  await user.type(
    screen.getByLabelText("メールアドレス"),
    "existing@example.com",
  );
  await user.type(
    screen.getByLabelText("パスワード", { exact: true }),
    "password123",
  );
  await user.type(
    screen.getByLabelText("パスワード（確認）"),
    "password123",
  );
  await user.click(screen.getByRole("button", { name: "新規登録" }));

  expect(await screen.findByRole("alert")).toHaveTextContent(emailError);
  expect(
    screen.queryByText("別のメールアドレスを入力してください。"),
  ).not.toBeInTheDocument();
  expect(replace).not.toHaveBeenCalled();
});
