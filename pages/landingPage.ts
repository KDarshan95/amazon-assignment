import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class LandingPage {
  readonly searchDropdown: Locator = this.page.locator("#searchDropdownBox");
  readonly searchBar: Locator = this.page.getByLabel("Search Amazon.in");
  readonly searchedSuggestions: Locator = this.page.locator(
    ".s-suggestion-container"
  );

   constructor(protected page: Page) {}

  async selectSearchCategory(option: string) {
    await this.searchDropdown.waitFor({ state: "visible" });
    await this.searchDropdown.selectOption(option);
  }

  async fillSearchSection(productName: string) {
    await this.searchBar.clear();
    await this.searchBar.pressSequentially(productName, { delay: 100 });
  }

  async getAllSuggestions() {
    await this.searchedSuggestions.first().waitFor({ state: "visible" });
    return await this.searchedSuggestions.allInnerTexts();
  }

  async clickOnPrefferedSuggestion() {
    await this.searchedSuggestions.first().click({ force: true });
  }
}
