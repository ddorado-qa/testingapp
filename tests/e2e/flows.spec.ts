import { test } from '@playwright/test';
import { createAndDeleteUserFlow } from '../flows/user.flows';
import { createAndDeleteOrderFlow } from '../flows/order.flows';

test('Flujo completo: crear usuario y pedido', async ({ page }) => {
  await createAndDeleteUserFlow(page);
  await createAndDeleteOrderFlow(page);
});
