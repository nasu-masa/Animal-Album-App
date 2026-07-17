import { expect, test } from "@playwright/test";

test("一覧ページからメディア詳細ページを開ける", async ({ page }) => {
  await page.goto("/media");

  const firstMediaLink = page
    .getByRole("main")
    .getByRole("link")
    .filter({ has: page.getByRole("img") })
    .first();

  await expect(firstMediaLink).toBeVisible();
  await firstMediaLink.click();

  await expect(page).toHaveURL(/\/media\/\d+$/);
  await expect(page.getByText("カテゴリ", { exact: true })).toBeVisible();
});
