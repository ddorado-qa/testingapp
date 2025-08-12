import { BasePage } from './base.page';

export class OrdersPage extends BasePage {
  async goto() {
    await super.goto('/orders');
  }

  async createOrder(customer: string, product: string, quantity: number, status: string) {
    await this.hl.safeFill('orders.customerInput', customer);
    await this.hl.safeFill('orders.productInput', product);
    await this.hl.safeFill('orders.quantityInput', quantity.toString());
    await this.hl.safeFill('orders.statusInput', status);
    await this.hl.safeClick('orders.addButton');
  }

  async deleteOrderByIndex(index: number) {
    const rows = this.hl.get('orders.orderRows');
    const deleteBtn = rows.nth(index).locator('button:has-text("Delete")');
    await deleteBtn.click();
  }

  async getOrdersCount() {
    return await this.hl.get('orders.orderRows').count();
  }
}
