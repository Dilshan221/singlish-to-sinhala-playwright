const { expect } = require("@playwright/test");

async function translateAndGetSinhala(page, singlishText) {
  await page.goto("https://www.swifttranslator.com/", {
    waitUntil: "domcontentloaded",
  });

  const singlishInput = page.getByPlaceholder("Input Your Singlish Text Here.");
  await expect(singlishInput).toBeVisible();

  await singlishInput.fill(singlishText || "");
  await page.keyboard.press("Escape");

  // Sometimes site needs a small delay to generate output
  await page.waitForTimeout(500);

  // Sinhala card
  const sinhalaCard = page
    .locator("div.card")
    .filter({
      has: page.locator(".panel-title", { hasText: "Sinhala" }),
    })
    .first();

  // ✅ Output is usually inside textarea/input (value), not innerText
  const outputBox = sinhalaCard.locator("textarea, input").first();

  // If outputBox exists, read value. Otherwise fallback to text.
  if (await outputBox.count()) {
    // Wait for Sinhala letters to appear (positive tests)
    try {
      await expect(outputBox).toHaveValue(/[අ-ෆ]/, { timeout: 15000 });
    } catch (e) {
      // For negative tests, Sinhala may not appear
    }

    const val = (await outputBox.inputValue()).trim();
    return val;
  }

  // Fallback: if site changes structure and output is plain text
  try {
    await expect(sinhalaCard).toContainText(/[අ-ෆ]/, { timeout: 15000 });
  } catch (e) {}

  const text = (await sinhalaCard.innerText()).trim();
  const cleaned = text.replace(/^Sinhala\s*/i, "").trim();
  return cleaned;
}

module.exports = { translateAndGetSinhala };
