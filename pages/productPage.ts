import { Locator,Page } from "playwright/test";
import { BasePage } from "./basePage";

export class ProductPage {
  readonly applestorelink: Locator = this.page.getByRole("link", {
    name: "Visit the Apple Store",
  });

  constructor(protected page: Page) {}

  async clickOnStoreLink() {
    await this.applestorelink.waitFor({ state: "visible" });
    await this.applestorelink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
