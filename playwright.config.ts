import { PlaywrightTestConfig } from "playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000,
  use: {
    baseURL: "https://www.amazon.in",
    headless: false,
    viewport: { width: 1366, height: 768 },
    screenshot: "on",
    trace: "on",
  },
  reporter: [["html", { outputFolder: "reports", open: "never" }], ["list"]],
};

export default config;
