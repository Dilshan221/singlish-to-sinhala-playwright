const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0016 - Collocation", async ({ page }) => {
  const input = "honda weda.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0016", "| Category:", "Collocation");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});