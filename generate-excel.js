const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const resultsPath = path.join(__dirname, "test-results.json");
const outDir = path.join(__dirname, "reports");
const outFile = path.join(outDir, "Singlish_to_Sinhala_Test_Report.xlsx");

if (!fs.existsSync(resultsPath)) {
  console.error("❌ test-results.json not found.");
  console.error("👉 Run tests first: npx playwright test");
  process.exit(1);
}

// Read + remove BOM + trim
const raw = fs
  .readFileSync(resultsPath, "utf8")
  .replace(/^\uFEFF/, "")
  .trim();

if (!raw) {
  console.error("❌ test-results.json is empty.");
  console.error(
    "👉 Fix: Make sure reporter outputFile is set in playwright.config.js",
  );
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("❌ Invalid JSON in test-results.json");
  console.error(e.message);
  process.exit(1);
}

const rows = [];

function walkSuites(suites) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const t of spec.tests || []) {
        const r = (t.results && t.results[t.results.length - 1]) || {};

        // Extract ID from title like Pos_Fun_0004 / Neg_Fun_0002
        const idMatch = spec.title.match(/_(\d{4})/);
        const testId = idMatch ? idMatch[1] : "";

        rows.push({
          Test_ID: testId,
          Test_Name: spec.title,
          Status: r.status || "unknown",
          Duration_ms: r.duration || 0,
          Project: t.projectName || "",
          File: spec.file || "",
          Error: r.error ? String(r.error.message || "").slice(0, 200) : "",
        });
      }
    }
    walkSuites(suite.suites);
  }
}

walkSuites(data.suites);

if (!rows.length) {
  console.error("❌ No rows found in JSON. (Did tests actually run?)");
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(rows);

// Auto column widths
ws["!cols"] = Object.keys(rows[0]).map((k) => ({
  wch: Math.min(
    60,
    Math.max(k.length, ...rows.map((r) => (r[k] ? String(r[k]).length : 0))),
  ),
}));

XLSX.utils.book_append_sheet(wb, ws, "Results");
XLSX.writeFile(wb, outFile);

console.log("✅ Excel saved:", outFile);
console.log("✅ Rows:", rows.length);
