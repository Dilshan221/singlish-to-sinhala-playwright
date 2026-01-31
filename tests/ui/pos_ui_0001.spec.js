const { test, expect } = require("@playwright/test");

test("UI_0001 - Clear button clears Singlish input", async ({ page }) => {
  await page.goto("https://www.swifttranslator.com/", { waitUntil: "domcontentloaded" });

  const singlishInput = page.getByPlaceholder("Input Your Singlish Text Here.");
  await expect(singlishInput).toBeVisible();

  await singlishInput.fill("mama gedara yanavaa.");
  await expect(singlishInput).toHaveValue(/mama/);

  await page.getByRole("button", { name: /Clear/i }).click();
  await expect(singlishInput).toHaveValue("");
});