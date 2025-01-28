import { Locator,Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigateToAmazon() {
    await this.page.goto("https://www.amazon.in", {
      waitUntil: "domcontentloaded",
    });
  }
}
