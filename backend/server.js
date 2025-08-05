// Backend simple con logging básico y simulación de sesiones

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(require('cors')());

const LOG_FILE = path.join(__dirname, 'data', 'logs.json');

// Asegura que logs.json exista
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '[]');
}

app.get('/api/logs', (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE));
  res.json(logs);
});

app.post('/api/logs', (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE));
  logs.push({ ...req.body, timestamp: new Date().toISOString() });
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  res.status(201).json({ message: 'Log saved' });
});

app.listen(PORT, () => {
  console.log(`🟢 Backend running on http://localhost:${PORT}`);
});
