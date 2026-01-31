const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0006 - Request (polite)", async ({ page }) => {
  const input = "karunakara mata udaw karanna.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0006", "| Category:", "Request (polite)");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});