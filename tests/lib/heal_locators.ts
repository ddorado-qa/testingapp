import { Page, Locator } from '@playwright/test';
import { locatorMap } from './locator_map';
import { locatorBackups } from './locator_backups';
import { logSelectorChange } from './db_logger';
import fs from 'fs';
import path from 'path';

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

  async safeClick(key: string, testFile: string = '') {
    try {
      await this.get(key).click();
    } catch {
      await this.recoverSelector(key, 'click', undefined, testFile);
    }
  }

  async safeFill(key: string, value: string, testFile: string = '') {
    try {
      await this.get(key).fill(value);
    } catch {
      await this.recoverSelector(key, 'fill', value, testFile);
    }
  }

  async recoverSelector(key: string, action: string, value?: string, testFile: string = '') {
    const oldSelector = locatorMap[key];
    console.warn(`⚠ Selector roto: ${key} → ${oldSelector}. Intentando recuperación...`);

    // Intento simple: buscar por texto
    const approxText = key.split('.').pop()?.replace(/Input|Button|Select|Rows/gi, '');
    const candidate = this.page.locator(`text=${approxText}`);

    if (await candidate.count() > 0) {
      const newSelector = `text=${approxText}`;
      console.info(`✅ Recuperado: ${key} → ${newSelector}`);

      // Guardar en backups
      if (!locatorBackups[key]) locatorBackups[key] = [];
      locatorBackups[key].push(oldSelector);

      // Guardar en SQLite
      logSelectorChange(key, oldSelector, newSelector, testFile);

      // Actualizar locatorMap y persistir en archivo
      locatorMap[key] = newSelector;
      this.persistLocatorMap();

      // Persistir backups
      this.persistLocatorBackups();

      // Ejecutar acción con nuevo selector
      if (action === 'click') await candidate.first().click();
      if (action === 'fill' && value) await candidate.first().fill(value);

      return;
    }

    throw new Error(`No se pudo recuperar selector para: ${key}`);
  }

  persistLocatorMap() {
    const mapPath = path.resolve(__dirname, './locator_map.ts');
    const content = `export const locatorMap: Record<string, string> = ${JSON.stringify(locatorMap, null, 2)};`;
    fs.writeFileSync(mapPath, content, 'utf-8');
  }

  persistLocatorBackups() {
    const backupPath = path.resolve(__dirname, './locator_backups.ts');
    const content = `export const locatorBackups: Record<string, string[]> = ${JSON.stringify(locatorBackups, null, 2)};`;
    fs.writeFileSync(backupPath, content, 'utf-8');
  }
}
