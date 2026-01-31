const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0024 - Plural", async ({ page }) => {
  const input = "lamayi iskole yanavaa.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0024", "| Category:", "Plural");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});