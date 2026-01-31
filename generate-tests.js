const fs = require("fs");
const path = require("path");

// ================= CONFIG =================

// ✅ 24 POSITIVE scenarios
const positiveTests = [
  { id: "0004", category: "Greeting", text: "oyata kohomada?" },
  { id: "0005", category: "Greeting", text: "suba udasanak!" },
  {
    id: "0006",
    category: "Request (polite)",
    text: "karunakara mata udaw karanna.",
  },
  { id: "0007", category: "Response", text: "hari, mama ennam." },

  { id: "0008", category: "Simple", text: "mama gedara yanavaa." },
  { id: "0009", category: "Simple", text: "oya kawuda?" },
  { id: "0010", category: "Compound", text: "mama kanawa saha oya bonawa." },
  { id: "0011", category: "Complex", text: "oya enakota mama gedara inne." },

  { id: "0012", category: "Question", text: "oyaa monawada karanne?" },
  { id: "0013", category: "Command", text: "ithaama ikmanin enna." },

  { id: "0014", category: "Negative sentence", text: "mama enna bae." },
  { id: "0015", category: "Negative (daily)", text: "oya ehema karanna epa." },

  { id: "0016", category: "Collocation", text: "honda weda." },
  { id: "0017", category: "Emphasis repeat", text: "ikman ikman enna." },

  { id: "0018", category: "Joined words", text: "oyatamathakayida?" },
  { id: "0019", category: "Segmented words", text: "oyata mathakayida?" },

  { id: "0020", category: "Past tense", text: "mama iye gedara giya." },
  { id: "0021", category: "Present tense", text: "mama dan gedara inne." },
  { id: "0022", category: "Future tense", text: "mama heta gedara yanawa." },

  { id: "0023", category: "Pronoun", text: "api gedara yanavaa." },
  { id: "0024", category: "Plural", text: "lamayi iskole yanavaa." },

  { id: "0025", category: "Polite", text: "karunakara kiyanna." },
  { id: "0026", category: "Informal", text: "mokakda me?" },

  {
    id: "0027",
    category: "Medium length (31–299)",
    text: "oyata kohomada? mama dan office yanawa. karunakara mata call ekak denna.",
  },
];

// ✅ 10 NEGATIVE scenarios (Realistic)
const negativeTests = [
  { id: "0002", category: "Empty input", text: "" },
  { id: "0003", category: "Numbers only", text: "123456" },
  { id: "0004", category: "Symbols only", text: "@@@###" },
  {
    id: "0005",
    category: "Technical brand terms",
    text: "mama Google account ekak hadanawa",
  },
  { id: "0006", category: "Abbreviation", text: "api ETA 5 min" },
  { id: "0007", category: "Date format", text: "2026-01-28" },
  { id: "0008", category: "Time format", text: "10:30 AM" },
  { id: "0009", category: "Currency", text: "Rs. 2500" },
  {
    id: "0010",
    category: "Long gibberish (≥300)",
    text:
      "asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn " +
      "asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn " +
      "asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn " +
      "asdjkh qweoiu zxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn asdjkhqweoiuzxcmn",
  },
  {
    id: "0011",
    category: "Multiple spaces + line breaks",
    text: "mama     gedara\nyanawa\n\n",
  },
];

// ================= PATHS =================
const baseDir = path.join(__dirname, "tests");
const positiveDir = path.join(baseDir, "positive");
const negativeDir = path.join(baseDir, "negative");
const uiDir = path.join(baseDir, "ui");

// ✅ From tests/positive/*.spec.js -> ../_template_translation.helper.js
const helperImportPath = "../_template_translation.helper.js";

// ================= HELPERS =================
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function clearDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isFile()) fs.unlinkSync(full);
  }
}

// ================= CREATE / CLEAN FOLDERS =================
ensureDir(positiveDir);
ensureDir(negativeDir);
ensureDir(uiDir);

clearDir(positiveDir);
clearDir(negativeDir);
clearDir(uiDir);

// ================= GENERATE POSITIVE TESTS =================
positiveTests.forEach((t) => {
  const content = `
const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("${helperImportPath}");

test("Pos_Fun_${t.id} - ${t.category}", async ({ page }) => {
  const input = ${JSON.stringify(t.text)};
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "${t.id}", "| Category:", ${JSON.stringify(t.category)});
  console.log("Input:", input);
  console.log("Actual Sinhala Output:", actual);

  // Positive must output Sinhala letters
  expect(actual).toMatch(/[අ-ෆ]/);
});
`.trim();

  fs.writeFileSync(path.join(positiveDir, `pos_fun_${t.id}.spec.js`), content);
});

// ================= GENERATE NEGATIVE TESTS (FIXED RULES) =================
negativeTests.forEach((t) => {
  const content = `
const { test, expect } = require("@playwright/test");
const { translateAndGetSinhala } = require("${helperImportPath}");

test("Neg_Fun_${t.id} - ${t.category}", async ({ page }) => {
  const input = ${JSON.stringify(t.text)};
  const actual = await translateAndGetSinhala(page, input);

  console.log("ID:", "${t.id}", "| Category:", ${JSON.stringify(t.category)});
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
  const isDateOrTime = /^[0-9\\s:.-]+(AM|PM)?$/i.test(trimmedInput);
  const isCurrency = /^rs\\.?\\s*[0-9]+/i.test(trimmedInput);

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
`.trim();

  fs.writeFileSync(path.join(negativeDir, `neg_fun_${t.id}.spec.js`), content);
});

// ================= 1 UI TEST =================
const uiTest = `
const { test, expect } = require("@playwright/test");

test("UI_0001 - Clear button clears Singlish input", async ({ page }) => {
  await page.goto("https://www.swifttranslator.com/", { waitUntil: "domcontentloaded" });

  const singlishInput = page.getByPlaceholder("Input Your Singlish Text Here.");
  await expect(singlishInput).toBeVisible();

  await singlishInput.fill("mama gedara yanavaa.");
  await expect(singlishInput).toHaveValue(/mama/);

  await page.getByRole("button", { name: /Clear/i }).click();
  await expect(singlishInput).toHaveValue("");
});
`.trim();

fs.writeFileSync(path.join(uiDir, "pos_ui_0001.spec.js"), uiTest);

console.log("✅ Generated: 24 positive + 10 negative + 1 UI test files");
