const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0005 - Greeting", async ({ page }) => {
  const input = "suba udasanak!";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0005", "| Category:", "Greeting");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});