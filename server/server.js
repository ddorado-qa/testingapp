// Servidor web backend con logs y roles
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/login', (_, res) => res.sendFile(path.join(__dirname, '../public/login.html')));
app.get('/profile', (_, res) => res.sendFile(path.join(__dirname, '../public/profile.html')));
app.get('/settings', (_, res) => res.sendFile(path.join(__dirname, '../public/settings.html')));
app.get('/dashboard', (_, res) => res.sendFile(path.join(__dirname, '../public/dashboard.html')));
app.get('/admin', (_, res) => res.sendFile(path.join(__dirname, '../public/admin.html')));

// API: persistir logs
app.post('/api/logs', (req, res) => {
  const logEntry = req.body;
  const filePath = path.join(__dirname, '../data/logs.json');
  let logs = [];

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    logs = JSON.parse(content);
  }

  logs.push({ timestamp: new Date().toISOString(), ...logEntry });
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
  res.json({ status: 'ok' });
});

app.listen(port, () => console.log(`App disponible en http://localhost:${port}`));
