import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SellerPage {
  readonly appleWatchLink: Locator = this.page.locator(
    "(//span[text()='Apple Watch'])[1]"
  );
  readonly appleWatchSeriesLink: Locator = this.page.getByText(
    "Apple Watch SE (GPS + Cellular)",
    { exact: true }
  );

  constructor(protected page: Page) {}

  async clickOnAppleWatchNav() {
    await this.appleWatchLink.waitFor({ state: "visible" });
    await this.appleWatchLink.click();
  }

  async clickAppleWatchSeriesLink() {
    await this.appleWatchSeriesLink.waitFor({ state: "visible" });
    await this.appleWatchSeriesLink.click();
    await this.page.waitForLoadState("load");
  }
}
