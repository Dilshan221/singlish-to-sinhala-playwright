const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0010 - Compound", async ({ page }) => {
  const input = "mama kanawa saha oya bonawa.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0010", "| Category:", "Compound");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});