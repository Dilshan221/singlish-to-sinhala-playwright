const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0017 - Emphasis repeat", async ({ page }) => {
  const input = "ikman ikman enna.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0017", "| Category:", "Emphasis repeat");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});