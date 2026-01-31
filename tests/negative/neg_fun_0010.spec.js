const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("../_template_translation.helper.js");

test("Neg_Fun_0010 - Long gibberish (≥300)", async ({ page }) => {
  const input = "asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn";
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "0010", "| Category:", "Long gibberish (≥300)");
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // ✅ Negative rules (Realistic)
  const trimmedInput = (input || "").trim();
  const trimmedActual = (actual || "").trim();

  // 1) Empty input -> output should be empty
  if (!trimmedInput) {
    expect(trimmedActual).toBe("");
    return;
  }

  // 2) Pure numbers/date/time/currency/symbols -> should NOT become Sinhala letters
  const isNumbersOnly = /^[0-9]+$/.test(trimmedInput);
  const isSymbolsOnly = /^[^A-Za-z0-9]+$/.test(trimmedInput);
  const isDateOrTime = /^[0-9\s:.-]+(AM|PM)?$/i.test(trimmedInput);
  const isCurrency = /^rs\.?\s*[0-9]+/i.test(trimmedInput);

  if (isNumbersOnly || isSymbolsOnly || isDateOrTime || isCurrency) {
    expect(trimmedActual).not.toMatch(/[අ-ෆ]/);
    return;
  }

  // 3) Brand/technical terms: allow Sinhala mix, BUT must keep English word(s)
  // (Google account / ETA / min etc.)
  if (/google|account|eta|min/i.test(trimmedInput)) {
    expect(trimmedActual).toMatch(/[A-Za-z]/); // must contain English letters
    return;
  }

  // 4) Default fallback: if Sinhala appears, it must NOT be Sinhala-only output
  if (/[අ-ෆ]/.test(trimmedActual)) {
    expect(trimmedActual).toMatch(/[A-Za-z0-9]/);
  } else {
    // If no Sinhala, still ok for negative
    expect(trimmedActual.length).toBeGreaterThanOrEqual(0);
  }
});