const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0020 - Past tense", async ({ page }) => {
  const input = "mama iye gedara giya.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0020", "| Category:", "Past tense");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});