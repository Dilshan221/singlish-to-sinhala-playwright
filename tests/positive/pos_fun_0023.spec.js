const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0023 - Pronoun", async ({ page }) => {
  const input = "api gedara yanavaa.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0023", "| Category:", "Pronoun");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});