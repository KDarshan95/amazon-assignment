import { Locator, Page } from "@playwright/test";
export class WatchPage {
  readonly watchContainers: Locator = this.page.locator(
    "//a[starts-with(@href,'/Apple-Cellular-Smartwatch')]"
  );
  readonly quickLook: Locator = this.page.locator(".QuickLook__label__tOBqR");
  readonly productShowcase: Locator = this.page.getByTestId(
    "product-showcase-container"
  );
  readonly productShowcaseTitle: Locator = this.page.getByTestId(
    "product-showcase-title"
  );

  constructor(protected page: Page) {}

  async hoverOnWatchContainer() {
    await this.watchContainers.first().waitFor({ state: "visible" });
    await this.watchContainers.first().hover();
  }

  async clickOnQuickLook() {
    await this.quickLook.first().waitFor({ state: "visible" });
    await this.quickLook.first().click({ force: true });
    await this.productShowcase.waitFor({ state: "visible" });
  }

  async getProductTitle() {
    return await this.productShowcaseTitle.textContent();
  }
}
