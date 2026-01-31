const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0014 - Negative sentence", async ({ page }) => {
  const input = "mama enna bae.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0014", "| Category:", "Negative sentence");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});