import { Page, Locator } from '@playwright/test';
import { locatorMap } from './locator_map';

export class HealLocator {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get(key: string): Locator {
    const selector = locatorMap[key];
    if (!selector) throw new Error(`Selector no encontrado para clave: ${key}`);
    return this.page.locator(selector);
  }

  async safeClick(key: string) {
    const loc = this.get(key);
    try {
      await loc.click();
    } catch {
      await this.recoverSelector(key, 'click');
    }
  }

  async safeFill(key: string, value: string) {
    const loc = this.get(key);
    try {
      await loc.fill(value);
    } catch {
      await this.recoverSelector(key, 'fill', value);
    }
  }

  async recoverSelector(key: string, action: string, value?: string) {
    console.warn(`⚠ Selector roto: ${key}. Intentando recuperación...`);

    // Intento simple: buscar por texto aproximado
    const approxText = key.split('.').pop()?.replace(/Input|Button|Select|Rows/gi, '');
    const candidate = this.page.locator(`text=${approxText}`);

    if (await candidate.count() > 0) {
      console.info(`✅ Recuperado dinámicamente: ${key} → text=${approxText}`);
      locatorMap[key] = `text=${approxText}`;
      if (action === 'click') await candidate.first().click();
      if (action === 'fill' && value) await candidate.first().fill(value);
      return;
    }

    throw new Error(`No se pudo recuperar selector para: ${key}`);
  }
}
