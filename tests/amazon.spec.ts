import { test, expect, Page, Browser, chromium } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { LandingPage } from "../pages/landingPage";
import { SearchedProductPage } from "../pages/searchedProductPage";
import { ProductPage } from "../pages/productPage";
import { SellerPage } from "../pages/sellerPage";
import { WatchPage } from "../pages/watchPage";

test.describe("Amazon test", () => {
  let browser: Browser;
  let page: Page;
  let basePage: BasePage;
  let landingPage: LandingPage;
  let searchedProductPage: SearchedProductPage;
  let productPage: ProductPage;
  let sellerPage: SellerPage;
  let watchPage: WatchPage;
  test.describe.configure({ timeout: 100 * 1000 });

  test.beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    basePage = new BasePage(page);
    landingPage = new LandingPage(page);
    searchedProductPage = new SearchedProductPage(page);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Amazon search test", async () => {
    const SEARCH_CATEGORY_ELECTRONICS = "Electronics";
    const PRODUCT_IPHONE_13 = "iPhone 13";
    const PRODUCT_IPHONE_13_128GB = "iPhone 13 128 GB";

    await test.step("Navigate to amazon.com", async () => {
      await basePage.navigateToAmazon();
      expect(page.url()).toContain("amazon");
    });

    await test.step("Select Electronics from category dropdown", async () => {
      await landingPage.selectSearchCategory(SEARCH_CATEGORY_ELECTRONICS);
    });

    await test.step("Search for iPhone 13", async () => {
      await landingPage.fillSearchSection(PRODUCT_IPHONE_13);
    });

    await test.step("Verify search suggestions", async () => {
      const suggestions = await landingPage.getAllSuggestions();
      expect(suggestions.length).toBeGreaterThan(0);
      suggestions.forEach((suggestion) => {
        expect(suggestion.toLowerCase()).toContain("iphone");
      });
    });

    await test.step("Search for iPhone 13 128 gb and click forst suggestion", async () => {
      await landingPage.fillSearchSection(PRODUCT_IPHONE_13_128GB);
      await landingPage.clickOnPrefferedSuggestion();
    });

    await test.step("On search result page, click on the first product", async () => {
      const newPage = await searchedProductPage.clickOnFirstProduct();
      await expect(newPage).toHaveURL(/amazon\.in/);

      productPage = new ProductPage(newPage);
      sellerPage = new SellerPage(newPage);
      watchPage = new WatchPage(newPage);
    });

    await test.step("On product page, click and navigate to seller homePage", async () => {
      await productPage.clickOnStoreLink();
    });

    await test.step("On seller Homepage, click on apple watch link", async () => {
      await sellerPage.clickOnAppleWatchNav();
      await sellerPage.clickAppleWatchSeriesLink();
    });

    await test.step("On watch page, hover over the watch container and click on Quick Look", async () => {
      await watchPage.hoverOnWatchContainer();
      await watchPage.clickOnQuickLook();
    });

    await test.step("On Quick Look modal, verify the product title", async () => {
      const productTitle = await watchPage.getProductTitle();
      expect(productTitle).toContain("Starlight");
    });
  });
});
