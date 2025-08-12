import { Page, expect } from '@playwright/test';
import { UsersPage } from '../pages/users.page';

export async function createAndDeleteUserFlow(page: Page) {
  const usersPage = new UsersPage(page);

  await usersPage.goto();
  const initialCount = await usersPage.getUsersCount();

  await usersPage.createUser('Test User', 'test@example.com');
  await expect(usersPage.userRows).toHaveCount(initialCount + 1);

  await usersPage.deleteUserByIndex(0);
  await expect(usersPage.userRows).toHaveCount(initialCount);
}
