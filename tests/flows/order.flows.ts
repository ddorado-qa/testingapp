import { Page, expect } from '@playwright/test';
import { OrdersPage } from '../pages/orders.page';

export async function createAndDeleteOrderFlow(page: Page) {
  const ordersPage = new OrdersPage(page);

  await ordersPage.goto();
  const initialCount = await ordersPage.getOrdersCount();

  await ordersPage.createOrder('Test Customer', 'Test Product', 5, 'Pending');
  await expect(ordersPage.orderRows).toHaveCount(initialCount + 1);

  await ordersPage.deleteOrderByIndex(0);
  await expect(ordersPage.orderRows).toHaveCount(initialCount);
}
