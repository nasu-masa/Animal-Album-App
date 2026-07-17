import { expect, test } from "@playwright/test";

test("新しいユーザーを登録してログイン状態になれる", async ({ page }, testInfo) => {
  const email = `e2e-register-${Date.now()}-${testInfo.workerIndex}@example.com`;
  const password = "password123";

  await page.goto("/register");

  await page.getByLabel("名前").fill("E2E Test User");
  await page.getByLabel("メールアドレス").fill(email);
  await page.getByLabel("パスワード", { exact: true }).fill(password);
  await page.getByLabel("パスワード（確認）").fill(password);
  await page.getByRole("button", { name: "新規登録" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "ログアウト" })).toBeVisible();
});
