import { Page } from '@playwright/test';
import { HealLocator } from '../lib/heal_locators';

export class BasePage {
  readonly page: Page;
  readonly hl: HealLocator;

  constructor(page: Page) {
    this.page = page;
    this.hl = new HealLocator(page);
  }

  async goto(path: string) {
    await this.page.goto(path);
  }
}
