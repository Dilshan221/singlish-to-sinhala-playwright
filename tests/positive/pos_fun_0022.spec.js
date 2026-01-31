const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0022 - Future tense", async ({ page }) => {
  const input = "mama heta gedara yanawa.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0022", "| Category:", "Future tense");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});