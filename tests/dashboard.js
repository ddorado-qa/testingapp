/**
 * Dashboard de cambios de selectores curados con gráfico
 * Levantar con: node dashboard.js
 */
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.resolve(__dirname, './tests_info.db');
const PORT = process.env.PORT || 4000;
const app = express();

// Conexión persistente a la BBDD
const db = new Database(DB_PATH);

// Utilidad para escapar HTML
function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
// Crear tabla si no existe
function initDB() {
  const db = new Database(DB_PATH);
  db.prepare(`
    CREATE TABLE IF NOT EXISTS selector_changes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT,
      old_selector TEXT,
      new_selector TEXT,
      test_file TEXT,
      occurred_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
  db.close();
}

// Inicializar base de datos
initDB();

function getChanges({ testFile, dateFrom, dateTo, limit = 50, offset = 0 }) {
  let query = 'SELECT * FROM selector_changes WHERE 1=1';
  const params = [];

  if (testFile) {
    query += ' AND test_file LIKE ?';
    params.push(`%${testFile}%`);
  }
  if (dateFrom) {
    query += ' AND occurred_at >= ?';
    params.push(dateFrom);
  }
  if (dateTo) {
    query += ' AND occurred_at <= ?';
    params.push(dateTo);
  }

  query += ' ORDER BY occurred_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return db.prepare(query).all(...params);
}

function getDailyStats() {
  const query = `
    SELECT DATE(occurred_at) as date, COUNT(*) as total
    FROM selector_changes
    GROUP BY DATE(occurred_at)
    ORDER BY DATE(occurred_at)
  `;
  return db.prepare(query).all();
}

// API JSON para integraciones automáticas
app.get('/api/selectors', (req, res) => {
  const { testFile, dateFrom, dateTo, limit, offset } = req.query;
  try {
    const changes = getChanges({
      testFile,
      dateFrom,
      dateTo,
      limit: parseInt(limit) || 50,
      offset: parseInt(offset) || 0
    });
    res.json({ total: changes.length, data: changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// HTML dashboard
app.get('/selectors', (req, res) => {
  const { testFile, dateFrom, dateTo, limit, offset } = req.query;
  const changes = getChanges({
    testFile,
    dateFrom,
    dateTo,
    limit: parseInt(limit) || 50,
    offset: parseInt(offset) || 0
  });

  const stats = getDailyStats();
  const chartLabels = stats.map(s => s.date);
  const chartData = stats.map(s => s.total);

  res.send(`
    <html>
      <head>
        <title>Historial de Selectores</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          h1 { color: #333; }
          table { border-collapse: collapse; width: 100%; background: white; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #333; color: white; }
          tr:nth-child(even) { background: #f9f9f9; }
          input, button { padding: 6px; margin: 4px; }
          .actions { margin-bottom: 10px; }
          .export { background: #007BFF; color: white; border: none; cursor: pointer; }
          #chartContainer { background: white; padding: 10px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>📋 Historial de Selectores Curados</h1>
        
        <div id="chartContainer">
          <canvas id="changesChart" height="100"></canvas>
        </div>

        <div class="actions">
          <form method="GET" action="/selectors" style="display:inline-block;">
            <label>Test File: <input type="text" name="testFile" value="${escapeHTML(testFile)}"></label>
            <label>Desde: <input type="date" name="dateFrom" value="${escapeHTML(dateFrom)}"></label>
            <label>Hasta: <input type="date" name="dateTo" value="${escapeHTML(dateTo)}"></label>
            <label>Límite: <input type="number" name="limit" min="1" max="500" value="${limit || 50}"></label>
            <button type="submit">Filtrar</button>
          </form>
          <form method="GET" action="/api/selectors" style="display:inline-block;">
            <input type="hidden" name="testFile" value="${escapeHTML(testFile)}">
            <input type="hidden" name="dateFrom" value="${escapeHTML(dateFrom)}">
            <input type="hidden" name="dateTo" value="${escapeHTML(dateTo)}">
            <button class="export">📤 Exportar JSON</button>
          </form>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Clave</th>
              <th>Selector Viejo</th>
              <th>Selector Nuevo</th>
              <th>Archivo Test</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            ${changes.map(c => `
              <tr>
                <td>${escapeHTML(c.id)}</td>
                <td>${escapeHTML(c.key)}</td>
                <td><code>${escapeHTML(c.old_selector)}</code></td>
                <td><code>${escapeHTML(c.new_selector)}</code></td>
                <td>${escapeHTML(c.test_file)}</td>
                <td>${escapeHTML(c.occurred_at)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <script>
          const ctx = document.getElementById('changesChart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ${JSON.stringify(chartLabels)},
              datasets: [{
                label: 'Cambios por día',
                data: ${JSON.stringify(chartData)},
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 }
                }
              }
            }
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Dashboard corriendo en http://localhost:${PORT}/selectors`);
  console.log(`📡 API JSON en http://localhost:${PORT}/api/selectors`);
});
