const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0013 - Command", async ({ page }) => {
  const input = "ithaama ikmanin enna.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0013", "| Category:", "Command");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});