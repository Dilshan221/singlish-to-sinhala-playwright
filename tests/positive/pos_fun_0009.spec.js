const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0009 - Simple", async ({ page }) => {
  const input = "oya kawuda?";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0009", "| Category:", "Simple");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});