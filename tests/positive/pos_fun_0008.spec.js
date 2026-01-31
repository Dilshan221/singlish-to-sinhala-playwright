const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0008 - Simple", async ({ page }) => {
  const input = "mama gedara yanavaa.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0008", "| Category:", "Simple");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});