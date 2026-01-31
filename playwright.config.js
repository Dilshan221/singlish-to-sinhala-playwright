// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,

  // ✅ This writes JSON directly to file (no PowerShell redirect needed)
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results.json" }],
    ["html", { open: "never" }],
  ],

  use: {
    headless: true,
  },

  projects: [
    { name: "Google Chrome", use: { browserName: "chromium", channel: "chrome" } },

    // ✅ If you already have these, keep them exactly (example)
    {
      name: "positive-only",
      testMatch: /tests\/positive\/.*\.spec\.js/,
      use: { browserName: "chromium" },
    },
    {
      name: "negative-only",
      testMatch: /tests\/negative\/.*\.spec\.js/,
      use: { browserName: "chromium" },
    },
    {
      name: "ui-only",
      testMatch: /tests\/ui\/.*\.spec\.js/,
      use: { browserName: "chromium" },
    },
  ],
});