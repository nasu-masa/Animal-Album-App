import { expect, test } from "@playwright/test";

test("ログインページを表示できる", async ({ page }) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { level: 1, name: "ログイン" }),
  ).toBeVisible();
});

test("正しいメールアドレスとパスワードでログインできる", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("メールアドレス").fill("demo@example.com");
  await page.getByLabel("パスワード").fill("demo1234");
  await page.getByRole("button", { name: "ログイン" }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("button", { name: "ログアウト" })).toBeVisible();
});

test("間違ったパスワードではログインできない", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("メールアドレス").fill("demo@example.com");
  await page.getByLabel("パスワード").fill("wrong-password");
  await page.getByRole("button", { name: "ログイン" }).click();

  await expect(page).toHaveURL("/login");
  await expect(
    page.getByRole("alert").filter({
      hasText: "メールアドレスまたはパスワードが正しくありません。",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "ログアウト" }),
  ).not.toBeVisible();
});

test("認証済みユーザーがログアウトできる", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("メールアドレス").fill("demo@example.com");
  await page.getByLabel("パスワード").fill("demo1234");
  await page.getByRole("button", { name: "ログイン" }).click();

  const logoutButton = page.getByRole("button", { name: "ログアウト" });
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();

  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("link", { name: "ログイン", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "ログアウト" }),
  ).not.toBeVisible();
});
