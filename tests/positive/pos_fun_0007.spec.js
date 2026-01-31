const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0007 - Response", async ({ page }) => {
  const input = "hari, mama ennam.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0007", "| Category:", "Response");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});