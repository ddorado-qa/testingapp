import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class OrdersPage extends BasePage {
  readonly customerInput: Locator;
  readonly productInput: Locator;
  readonly quantityInput: Locator;
  readonly statusInput: Locator;
  readonly addButton: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    super(page);
    this.customerInput = page.locator('input[placeholder="Customer"]');
    this.productInput = page.locator('input[placeholder="Product"]');
    this.quantityInput = page.locator('input[placeholder="Quantity"]');
    this.statusInput = page.locator('input[placeholder="Status"]');
    this.addButton = page.locator('button:has-text("Add Order")');
    this.orderRows = page.locator('table tbody tr');
  }

  async goto() {
    await super.goto('/orders');
  }

  async createOrder(customer: string, product: string, quantity: number, status: string) {
    await this.fillField(this.customerInput, customer);
    await this.fillField(this.productInput, product);
    await this.fillField(this.quantityInput, quantity.toString());
    await this.fillField(this.statusInput, status);
    await this.clickButton(this.addButton);
  }

  async deleteOrderByIndex(index: number) {
    const deleteBtn = this.orderRows.nth(index).locator('button:has-text("Delete")');
    await deleteBtn.click();
  }

  async getOrdersCount() {
    return await this.orderRows.count();
  }
}
