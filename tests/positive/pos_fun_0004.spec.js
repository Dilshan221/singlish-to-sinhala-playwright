const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0004 - Greeting", async ({ page }) => {
  const input = "oyata kohomada?";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0004", "| Category:", "Greeting");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});