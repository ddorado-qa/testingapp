import { BasePage } from './base.page';

export class UsersPage extends BasePage {
  async goto() {
    await super.goto('/users');
  }

  async createUser(name: string, email: string, role: string = 'user') {
    await this.hl.safeFill('users.nameInput', name);
    await this.hl.safeFill('users.emailInput', email);
    await this.page.selectOption('select', role);
    await this.hl.safeClick('users.addButton');
  }

  async deleteUserByIndex(index: number) {
    const rows = this.hl.get('users.userRows');
    const deleteBtn = rows.nth(index).locator('button:has-text("Delete")');
    await deleteBtn.click();
  }

  async getUsersCount() {
    return await this.hl.get('users.userRows').count();
  }
}
