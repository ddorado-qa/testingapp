// Servidor Express con persistencia de logs, CORS y simulación de sesión
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

const LOG_FILE = path.join(__dirname, "data", "logs.json");

app.use(cors());
app.use(bodyParser.json());

if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, "[]");
}

app.get("/", (req, res) => {
  res.send("API QA App funcionando");
});

app.post("/api/log", (req, res) => {
  const { message, level, user } = req.body;
  const logEntry = {
    message,
    level,
    user: user || "anon",
    timestamp: new Date().toISOString(),
  };
  const currentLogs = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
  currentLogs.push(logEntry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(currentLogs, null, 2));
  res.status(201).json({ ok: true });
});

app.get("/api/logs", (req, res) => {
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
