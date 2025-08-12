// Mapa central de selectores
export const locatorMap: Record<string, string> = {
  'users.nameInput': 'input[placeholder="Name"]',
  'users.emailInput': 'input[placeholder="Email"]',
  'users.roleSelect': 'select',
  'users.addButton': 'button:has-text("Add")',
  'users.userRows': 'table tbody tr',

  'orders.customerInput': 'input[placeholder="Customer"]',
  'orders.productInput': 'input[placeholder="Product"]',
  'orders.quantityInput': 'input[placeholder="Quantity"]',
  'orders.statusInput': 'input[placeholder="Status"]',
  'orders.addButton': 'button:has-text("Add Order")',
  'orders.orderRows': 'table tbody tr'
};
