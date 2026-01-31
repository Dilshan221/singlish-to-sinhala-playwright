const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0012 - Question", async ({ page }) => {
  const input = "oyaa monawada karanne?";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0012", "| Category:", "Question");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});