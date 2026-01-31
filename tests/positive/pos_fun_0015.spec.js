const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0015 - Negative (daily)", async ({ page }) => {
  const input = "oya ehema karanna epa.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0015", "| Category:", "Negative (daily)");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});