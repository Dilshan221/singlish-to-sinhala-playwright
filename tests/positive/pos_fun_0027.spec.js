const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Pos_Fun_0027 - Medium length (31–299)", async ({ page }) => {
  const input = "oyata kohomada? mama dan office yanawa. karunakara mata call ekak denna.";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0027", "| Category:", "Medium length (31–299)");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});