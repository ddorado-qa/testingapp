import { test } from '@playwright/test';
import { createAndDeleteOrderFlow } from '../flows/order.flows';

test('Crear y eliminar pedido', async ({ page }) => {
  await createAndDeleteOrderFlow(page);
});
