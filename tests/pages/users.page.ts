import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class UsersPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly roleSelect: Locator;
  readonly addButton: Locator;
  readonly userRows: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('input[placeholder="Name"]');
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.roleSelect = page.locator('select');
    this.addButton = page.locator('button:has-text("Add")');
    this.userRows = page.locator('table tbody tr');
  }

  async goto() {
    await super.goto('/users');
  }

  async createUser(name: string, email: string, role: string = 'user') {
    await this.fillField(this.nameInput, name);
    await this.fillField(this.emailInput, email);
    await this.roleSelect.selectOption(role);
    await this.clickButton(this.addButton);
  }

  async deleteUserByIndex(index: number) {
    const deleteBtn = this.userRows.nth(index).locator('button:has-text("Delete")');
    await deleteBtn.click();
  }

  async getUsersCount() {
    return await this.userRows.count();
  }
}
