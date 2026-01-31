const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0021 - Present tense", async ({ page }) => {
  const input = "mama dan gedara inne.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0021", "| Category:", "Present tense");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});