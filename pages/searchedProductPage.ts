import { Locator,Page } from "@playwright/test";

export class SearchedProductPage {
  readonly allResults: Locator = this.page.locator(
    "//span[contains(text(),'Apple iPhone 13')]"
  );

  constructor(protected page: Page) {}

  async clickOnFirstProduct() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.allResults.first().click({ force: true });
    return await popupPromise;
  }
}
