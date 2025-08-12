import { test } from '@playwright/test';
import { createAndDeleteUserFlow } from '../flows/user.flows';

test('Crear y eliminar usuario', async ({ page }) => {
  await createAndDeleteUserFlow(page);
});
