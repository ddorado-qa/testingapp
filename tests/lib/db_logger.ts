import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.resolve(__dirname, '../../tests_info.db');

// Crear DB si no existe
if (!fs.existsSync(DB_PATH)) {
  const db = new Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS selector_changes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL,
      old_selector TEXT NOT NULL,
      new_selector TEXT NOT NULL,
      test_file TEXT,
      occurred_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.close();
}

export function logSelectorChange(key: string, oldSel: string, newSel: string, testFile: string) {
  const db = new Database(DB_PATH);
  const stmt = db.prepare(`
    INSERT INTO selector_changes (key, old_selector, new_selector, test_file)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(key, oldSel, newSel, testFile);
  db.close();
}
