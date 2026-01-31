const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0011 - Complex", async ({ page }) => {
  const input = "oya enakota mama gedara inne.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0011", "| Category:", "Complex");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});