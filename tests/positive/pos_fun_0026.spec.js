const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0026 - Informal", async ({ page }) => {
  const input = "mokakda me?";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0026", "| Category:", "Informal");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});