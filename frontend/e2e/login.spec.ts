import { expect, test } from "@playwright/test";

test("ログインページを表示できる", async ({ page }) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { level: 1, name: "ログイン" }),
  ).toBeVisible();
});
