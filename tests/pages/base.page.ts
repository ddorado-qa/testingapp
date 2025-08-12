// BasePage centraliza métodos comunes entre páginas
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async fillField(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async clickButton(locator: Locator) {
    await locator.click();
  }

  async expectVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }
}
