import { PlaywrightTestConfig } from "playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000,
  use: {
    baseURL: "https://www.amazon.in",
    headless: true,
    viewport: { width: 1366, height: 768 },
    screenshot: "on",
    trace: "on",
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "Webkit",
      use: { browserName: "webkit" },
    },
  ],
};

export default config;
