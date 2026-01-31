const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0019 - Segmented words", async ({ page }) => {
  const input = "oyata mathakayida?";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0019", "| Category:", "Segmented words");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});